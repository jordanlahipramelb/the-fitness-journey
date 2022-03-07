"use strict";

/** Related functions for exercises. */

// Retrieve database
const db = require("../db");
// Retrieve functions that displays an error
const { BadRequestError, NotFoundError } = require("../expressError");
// Retrieve function that helps with updating sql
const { sqlForPartialUpdate } = require("../helpers/sql");

class Exercise {
  /** Create an exercise (from data), update db, return new exercise data.
   * - data should be {name, equipment_id, primary_muscle_id, secondary_muscle_id, description, instructions, image_url}
   *
   * Returns {name, equipment_id, primary_muscle_id, secondary_muscle_id, description, instructions, image_url}
   *
   * Throws BadRequestError if exericse already in database.
   *
   */

  static async create({
    name,
    equipment_id,
    primary_muscle_id,
    secondary_muscle_id,
    description,
    instructions,
    image_url,
  }) {
    const duplicateCheck = await db.query(
      `SELECT name 
          FROM exercises 
          WHERE handle = $1`,
      [name]
    );

    if (duplicateCheck[0])
      throw new BadRequestError(`Duplicate exercise name: ${name}`);

    const result = await db.query(
      `INSERT INTO exercises 
          (name, 
          equipment_id, 
          primary_muscle_id, 
          secondary_muscle_id, 
          description, 
          instructions, 
          image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id,
                  name, 
                  equipment_id AS "equipmentId", 
                  primary_muscle_id AS "primaryMuscleId", 
                  secondary_muscle_id AS "secondaryMuscleId", 
                  description, 
                  instructions, 
                  image_url AS "imageUrl"`,
      [
        name,
        equipment_id,
        primary_muscle_id,
        secondary_muscle_id,
        description,
        instructions,
        image_url,
      ]
    );

    const exercise = result.rows[0];

    return exercise;
  }

  /** Find all exercises (optional filter on searchFilters)
   *
   * searchFilters (optional): name (will find case-insensitive, partial matches)
   *
   * Returns  [{name, equipment_id, primary_muscle_id, secondary_muscle_id, description, instructions, image_url}, ...]
   */

  static async findAll(searchFilters = {}) {
    let query = `SELECT id, 
                        name, 
                        equipment_id AS "equipmentId", 
                        primary_muscle_id AS "primaryMuscleId", 
                        secondary_muscle_id AS "secondaryMuscleId", 
                        description, 
                        instructions, 
                        image_url AS "imageUrl"
                    FROM exercises`;

    // WHERE part of sql query
    let whereExpressions = [];
    // values of above queries
    let queryValues = [];

    const { name } = searchFilters;

    // push possible query search terms to whereExpressions and queryValues in order to generate the correct SQL query
    if (name) {
      // push name to query values
      queryValues.push(`%${name}%`);
      // matches query value to its index in the whereExpressions array
      whereExpressions.push(`name ILIKE $${queryValues.length}`);
    }

    // if there is something in the array, join the initial query SQL statement with WHERE and AND between each value of the array
    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // finalize query
    query += " ORDER BY name";

    const exercisesRes = await db.query(query, queryValues);
    return exercisesRes.rows;
  }

  /** Given an exercise id, return data about exercise.
   *
   * Returns [{id, name, equipment_id, primary_muscle_id, secondary_muscle_id, description, instructions, image_url}, ...]
   *
   * Throws NotFoundError if id not found
   */

  static async get(id) {
    const exerciseRes = await db.query(
      `SELECT exercises.id,
              exercises.name,
              equipment.type AS "equipmentType",
              m1.name AS "primaryMuscle",
              m2.name AS "secondaryMuscle",
              exercises.description, 
              exercises.instructions, 
              exercises.image_url
        FROM exercises
        FULL JOIN equipment
          ON exercises.equipment_id = equipment.id
        FULL JOIN muscles m1
          ON m1.id = exercises.primary_muscle_id
        FULL JOIN muscles m2
          ON m2.id = exercises.secondary_muscle_id
          WHERE exercises.id = $1`,
      [id]
    );

    const exercise = exerciseRes.rows[0];
    if (!exercise) throw new NotFoundError(`Exercise not found: ${id}`);

    return exercise;
  }

  /** Update exercise data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, equipment_id, primary_muscle_id, secondary_muscle_id, description, instructions, image_url}
   *
   * Returns {id, name, equipment_id, primary_muscle_id, secondary_muscle_id, description, instructions, image_url}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      equipmentId: "equipment_id",
      primaryMuscleId: "primary_muscle_id",
      secondaryMuscleId: "secondary_muscle_id",
      imageUrl: "image_url",
    });
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE exercises 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                name, 
                                equipment_id AS "equipmentId", 
                                primary_muscle_id AS "primaryMuscleId", 
                                secondary_muscle_id AS "secondaryMuscleId", 
                                description, 
                                instructions, 
                                image_url AS "imageUrl"`;
    const result = await db.query(querySql, [...values, id]);
    const exercise = result.rows[0];

    if (!exercise) throw new NotFoundError(`No exercise found: ${id}`);

    return exercise;
  }

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM exercises
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const exercise = result.rows[0];

    if (!exercise) throw new NotFoundError(`No exercise found: ${id}`);
  }
}

module.exports = Exercise;
