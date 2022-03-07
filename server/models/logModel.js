"use strict";

/** Related functions for posts. */

// Retrieve database
const db = require("../db");
// Retrieve functions that displays an error
const { NotFoundError } = require("../expressError");
// Retrieve function that helps with updating sql
const { sqlForPartialUpdate } = require("../helpers/sql");

class Log {
  /** Create a log (from data), update db, return new log data.
   * - data should be {date, username}
   *
   * Returns { id, date, username }
   */

  static async create({ date, username }) {
    const result = await db.query(
      `INSERT INTO logs 
          (date, username)
        VALUES ($1, $2)
        RETURNING id, date, username`,
      [date, username]
    );

    const log = result.rows[0];

    return log;
  }

  /** Find all routines
   *
   * Returns  [{id, date, username }, ...]
   */

  static async findAll(searchFilters = {}) {
    let query = `SELECT id, date, username
                      FROM logs`;

    // WHERE part of sql query
    let whereExpressions = [];
    // values of above queries
    let queryValues = [];

    const { date } = searchFilters;

    if (date) {
      // push possible query search terms to whereExpressions and queryValues in order to generate the correct SQL query
      // push date to query values
      queryValues.push(`%${date}%`);
      // matches query value to its index in the whereExpressions array
      whereExpressions.push(`date ILIKE $${queryValues.length}`);

      // if there is something in the array, join the initial query SQL statement with WHERE and AND between each value of the array
      if (whereExpressions.length > 0) {
        query += " WHERE " + whereExpressions.join(" AND ");
      }

      // finalize query
      query += " ORDER BY date";

      const logRes = await db.query(query, queryValues);

      return logRes.rows;
    } else {
      const logRes = await db.query(
        `SELECT id, date, username
            FROM logs`
      );

      return logRes.rows;
    }
  }

  /** Given log id, return data about log including its entries.
   *
   * Returns [ id, date, username, log_entries: [ { exerciseName, set_number, reps, weight }, ... ]  ]
   *
   * Throws NotFoundError if id not found
   */

  static async get(id) {
    const logRes = await db.query(
      `SELECT logs.id,
        logs.date,
        logs.username,
        CASE WHEN COUNT(logs_entries.id) = 0 
          THEN JSON '[]' ELSE JSON_AGG(
          JSON_BUILD_OBJECT('entryId', logs_entries.id, 'exerciseId', exercises.id, 'exerciseName', exercises.name, 'setNumber', logs_entries.set_number, 'reps', logs_entries.reps, 'weight', logs_entries.weight)
        ) 
        END AS entries
      FROM logs
          FULL JOIN logs_entries
              ON logs.id = logs_entries.log_id
          FULL JOIN routines_exercises
            ON logs_entries.routine_exercise_id = routines_exercises.id
          FULL JOIN exercises
            ON routines_exercises.exercise_id = exercises.id
      WHERE logs.id = $1
      GROUP BY logs.id
      ORDER BY logs.id`,
      [id]
    );

    const log = logRes.rows;
    if (!log) throw new NotFoundError(`Log not found: ${id}`);

    return log;
  }

  /** Given log id, returns data of log entries
   *
   * Returns [ id, log_id, exercise_name, set_number, reps, weight ]
   *
   * Throws NotFoundError if id not found
   */

  static async getLogEntries(id) {
    const res = await db.query(
      `SELECT logs_entries.id, 
              logs_entries.log_id, 
              exercises.name, 
              logs_entries.set_number, 
              logs_entries.reps,
              logs_entries.weight
        FROM logs_entries
        FULL JOIN routines_exercises
          ON logs_entries.routine_exercise_id = routines_exercises.id
        FULL JOIN exercises
          ON logs_entries.routine_exercise_id = exercises.id
        WHERE log_id = $1
        ORDER BY exercises.name`,
      [id]
    );

    const logEntries = res.rows;

    if (!logEntries) throw new NotFoundError(`Log not found: ${id}`);

    return logEntries;
  }

  /** Update log details data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: { date }
   *
   * Returns { id, username, date }
   *
   * Throws NotFoundError if not found.
   */

  static async updateDate(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE logs
                        SET ${setCols}
                        WHERE id = ${idVarIdx}
                        RETURNING id, date, username`;
    const result = await db.query(querySql, [...values, id]);
    const log = result.rows[0];

    if (!log) throw new NotFoundError(`No log found: ${id}`);

    return log;
  }

  /** Given log id, removes log from database */

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM logs
           WHERE id = $1
           RETURNING id`,
      [id]
    );

    const log = result.rows[0];

    if (!log) throw new NotFoundError(`No log found: ${id}`);
  }

  /** Handles log entries of log */

  /** Posts entry to log (from data), update db, return new log entry data.
   * - data should be
   * { log_id, routine_exercise_id, set_number, reps, weight }
   *
   * Returns
   * { log_id, routine_exercise_id, set_number, reps, weight }
   */

  static async addLogEntryToLog({
    log_id,
    routine_exercise_id,
    set_number,
    reps,
    weight,
  }) {
    const result = await db.query(
      `INSERT INTO logs_entries
            (log_id, routine_exercise_id, set_number, reps, weight)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING log_id, routine_exercise_id, set_number, reps, weight`,
      [log_id, routine_exercise_id, set_number, reps, weight]
    );

    const logEntry = result.rows[0];

    console.log(logEntry);

    return logEntry;
  }

  /** Given id, removes exercise from database */

  static async deleteLogEntryFromLog(id) {
    const result = await db.query(
      `DELETE
           FROM logs_entries
           WHERE id = $1
           RETURNING id`,
      [id]
    );

    const logEntry = result.rows[0];

    if (!logEntry) throw new NotFoundError(`No id found: ${id}`);
  }

  static async getRoutinesWithExercises() {
    const res = await db.query(
      `SELECT routines_exercises.id AS "routineExerciseId", 
              routines_exercises.routine_id AS "routineId",
              routines.name AS "routineName", 
              exercises.name AS "exerciseName", 
              routines_exercises.dayOfWeek, 
              routines_exercises.reps,
              routines_exercises.sets
            FROM routines_exercises
            LEFT JOIN exercises
              ON routines_exercises.exercise_id = exercises.id
            LEFT JOIN routines
              ON routines_exercises.routine_id = routines.id`,
      []
    );

    const routinesWithExercises = res.rows;

    if (!routinesWithExercises)
      throw new NotFoundError(`Routines/Exercises not found`);

    return routinesWithExercises;
  }
}

module.exports = Log;

// `SELECT logs.id,
//               logs.date,
//               logs.username,
//               CASE WHEN COUNT(logs_entries.id) = 0
//                 THEN JSON '[]' ELSE JSON_AGG(
//                 JSON_BUILD_OBJECT('exerciseId', exercises.id, 'exerciseName', exercises.name, 'setNumber', logs_entries.set_number, 'reps', logs_entries.reps, 'weight', logs_entries.weight)
//               )
//               END AS entries
//             FROM logs
//                 FULL JOIN logs_entries
//                     ON logs.id = logs_entries.log_id
//                 FULL JOIN routines_exercises
//                     ON logs_entries.routine_exercise_id = routines_exercises.exercise_id
//                 FULL JOIN exercises
//                     ON routines_exercises.exercise_id = exercises.id
//             WHERE logs.id = $1
//             GROUP BY logs.id
//             ORDER BY logs.id`;

// `SELECT logs.id,
//               logs.date,
//               logs.username,
//               exercises.id AS "exerciseId",
//               exercises.name AS "exerciseName",
//               logs_entries.set_number,
//               logs_entries.reps,
//               logs_entries.weight
//             FROM logs
//                 FULL JOIN logs_entries
//                     ON logs.id = logs_entries.log_id
//                 LEFT JOIN routines_exercises
//                     ON logs_entries.routine_exercise_id = routines_exercises.exercise_id
//                 LEFT JOIN exercises
//                     ON routines_exercises.exercise_id = exercises.id
//             WHERE logs.id = 1

//             ORDER BY logs.id`;
