"use strict";

/** Related functions for posts. */

// Retrieve database
const db = require("../db");
// Retrieve functions that displays an error
const { NotFoundError } = require("../expressError");
// Retrieve function that helps with updating sql
const { sqlForPartialUpdate } = require("../helpers/sql");

class Routine {
  /** Create a routine (from data), update db, return new routine data.
   * - data should be {username, name, description}
   *
   * Returns { id, name, username, description }
   */

  static async create({ name, username, description }) {
    const result = await db.query(
      `INSERT INTO routines 
          (name, username, description)
        VALUES ($1, $2, $3)
        RETURNING id, name, username, description`,
      [name, username, description]
    );

    const routine = result.rows[0];

    return routine;
  }

  /** Find all routines
   *
   * Returns  [{id, name, username }, ...]
   */

  static async findAll(searchFilters = {}) {
    let query = `SELECT id, 
                        name,
                        username,
                        is_private
                      FROM routines`;

    // WHERE part of sql query
    let whereExpressions = [];
    // values of above queries
    let queryValues = [];

    const { name } = searchFilters;

    if (name) {
      // push possible query search terms to whereExpressions and queryValues in order to generate the correct SQL query
      // push name to query values
      queryValues.push(`%${name}%`);
      // matches query value to its index in the whereExpressions array
      whereExpressions.push(`name ILIKE $${queryValues.length}`);

      // if there is something in the array, join the initial query SQL statement with WHERE and AND between each value of the array
      if (whereExpressions.length > 0) {
        query += " WHERE " + whereExpressions.join(" AND ");
      }

      // finalize query
      query += " ORDER BY name";

      const routineRes = await db.query(query, queryValues);

      return routineRes.rows;
    } else {
      const routineRes = await db.query(
        `SELECT id, 
                name,
                username,
                is_private
            FROM routines`
      );

      return routineRes.rows;
    }
  }

  /** Given routine id, return data about routine including its exercises.
   *
   * Returns [{id, name, username, dayOfWeek, exercises: [ name, sets, reps ] }, ...]
   *
   * Throws NotFoundError if id not found
   */

  static async get(id) {
    const routineRes = await db.query(
      `SELECT routines.id,
              routines.name,
              routines.username,
              routines.description,
              routines_exercises.dayOfWeek,
              CASE WHEN COUNT(routines_exercises.id) = 0 THEN JSON '[]' ELSE JSON_AGG(
              JSON_BUILD_OBJECT('exerciseId', exercises.id, 'exerciseName', exercises.name, 'sets', routines_exercises.sets, 'reps', routines_exercises.reps)
              ) 
              END AS exercises
            FROM routines
              FULL JOIN routines_exercises
                ON routines.id = routines_exercises.routine_id
              FULL JOIN exercises
                ON routines_exercises.exercise_id = exercises.id
            WHERE routines.id = $1
            GROUP BY routines.id, 
                  routines_exercises.dayOfWeek
            ORDER BY routines.id`,
      [id]
    );

    const routine = routineRes.rows;
    if (!routine) throw new NotFoundError(`Routine not found: ${id}`);

    return routine;
  }

  /** Update routine details data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: { username, name, description }
   *
   * Returns { username, name, description }
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE routines 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, username, name, description`;
    const result = await db.query(querySql, [...values, id]);
    const routine = result.rows[0];

    if (!routine) throw new NotFoundError(`No routine found: ${id}`);

    return routine;
  }

  /** Given routine id, removes routine from database */

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM routines
           WHERE id = $1
           RETURNING id`,
      [id]
    );

    const routine = result.rows[0];

    if (!routine) throw new NotFoundError(`No routine found: ${id}`);
  }

  /** Handles exercises of routine */

  /** Posts exercise to routine (from data), update db, return new routine exercise data.
   * - data should be
   * { routine_id, exercise_id, dayofweek, sets, reps }
   *
   * Returns
   * { routine_id, exercise_id, dayofweek, sets, reps }
   */

  static async addExerciseToRoutine({
    routine_id,
    exercise_id,
    dayOfWeek,
    reps,
    sets,
  }) {
    const result = await db.query(
      `INSERT INTO routines_exercises 
            (routine_id, exercise_id, dayOfWeek, reps, sets)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING routine_id, exercise_id, dayOfWeek, reps, sets`,
      [routine_id, exercise_id, dayOfWeek, reps, sets]
    );

    const exercise = result.rows[0];

    return exercise;
  }

  /** Given id, removes exercise from database */

  static async deleteExerciseFromRoutine(id) {
    const result = await db.query(
      `DELETE
           FROM routines_exercises
           WHERE id = $1
           RETURNING id`,
      [id]
    );

    const entryId = result.rows[0];

    if (!entryId) throw new NotFoundError(`No id found: ${id}`);
  }

  static async getRoutineExercises(id) {
    const res = await db.query(
      `SELECT routines_exercises.id, 
              routines_exercises.routine_id,
              routines.name, 
              exercises.name, 
              routines_exercises.dayOfWeek, 
              routines_exercises.reps,
              routines_exercises.sets
        FROM routines_exercises
        FULL JOIN exercises
          ON routines_exercises.exercise_id = exercises.id
        FULL JOIN routines
          ON routines_exercises.routine_id = routines.id
        WHERE routine_id = $1`,
      [id]
    );

    const routineExercises = res.rows;

    if (!routineExercises) throw new NotFoundError(`Routine not found: ${id}`);

    return routineExercises;
  }
}

module.exports = Routine;
