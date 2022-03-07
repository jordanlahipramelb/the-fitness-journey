"use strict";

/** Related functions for posts. */

// Retrieve database
const db = require("../db");
// Retrieve functions that displays an error
const { NotFoundError } = require("../expressError");
// Retrieve function that helps with updating sql
const { sqlForPartialUpdate } = require("../helpers/sql");

class PostComment {
  /** Create a comment (from data), update db, return new comment data.
   * - data should be { username, body, date, post_id }
   *
   * Returns {id, username, body, date, post_id }
   */

  static async create({ username, body, date, post_id }) {
    const result = await db.query(
      `INSERT INTO comments 
          (username, body, date, post_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id, username, body, date, post_id`,
      [username, body, date, post_id]
    );

    const comment = result.rows[0];

    return comment;
  }

  /** Get all comments for post
   *
   * Returns  [{id, username, body, date}, ...]
   */

  static async getAll(id) {
    const commentsRes = await db.query(
      `SELECT id, username, body, date
            FROM comments 
            WHERE post_id = $1 ORDER BY id`,
      [id]
    );

    return commentsRes.rows;
  }

  /** Update comment data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {username, subject, body, date}
   *
   * Returns {id, username, subject, body, date}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE comments 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, username, body, date, post_id`;

    const result = await db.query(querySql, [...values, id]);
    const comment = result.rows[0];

    if (!comment) throw new NotFoundError(`No comment found: ${id}`);

    return comment;
  }

  static async remove(id) {
    const result = await db.query(
      `DELETE FROM comments
           WHERE id = $1
           RETURNING id`,
      [id]
    );

    const comment = result.rows[0];

    if (!comment) throw new NotFoundError(`No comment found: ${id}`);
  }
}

module.exports = PostComment;
