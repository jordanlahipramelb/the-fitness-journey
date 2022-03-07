"use strict";

/** Related functions for posts. */

// Retrieve database
const db = require("../db");
// Retrieve functions that displays an error
const { NotFoundError } = require("../expressError");
// Retrieve function that helps with updating sql
const { sqlForPartialUpdate } = require("../helpers/sql");

class Post {
  /** Create a post (from data), update db, return new post data.
   * - data should be {username, subject, body}
   *
   * Returns {id, username, subject, body}
   */

  static async create({ username, subject, body, date }) {
    const result = await db.query(
      `INSERT INTO posts 
          (username, subject, body, date)
        VALUES ($1, $2, $3, $4)
        RETURNING username, subject, body, date`,
      [username, subject, body, date]
    );

    const post = result.rows[0];

    return post;
  }

  /** Find all posts
   *
   * Returns  [{id, username, subject, body}, ...]
   */

  static async findAll(searchFilters = {}) {
    let query = `SELECT id, username, subject, body, date
                      FROM posts `;

    // WHERE part of sql query
    let whereExpressions = [];
    // values of above queries
    let queryValues = [];

    const { subject } = searchFilters;

    if (subject) {
      // push possible query search terms to whereExpressions and queryValues in order to generate the correct SQL query
      // push subject to query values
      queryValues.push(`%${subject}%`);
      // matches query value to its index in the whereExpressions array
      whereExpressions.push(`subject ILIKE $${queryValues.length}`);

      // if there is something in the array, join the initial query SQL statement with WHERE and AND between each value of the array
      if (whereExpressions.length > 0) {
        query += " WHERE " + whereExpressions.join(" AND ");
      }

      // finalize query
      query += " ORDER BY subject";

      const postRes = await db.query(query, queryValues);

      return postRes.rows;
    } else {
      const postRes = await db.query(
        `SELECT id, username, subject, body, date
          FROM posts 
          ORDER BY date`
      );

      return postRes.rows;
    }
  }

  /** Given post id, return data about post including its comments.
   *
   * Returns:
   *           { id,
   *             username,
   *             subject,
   *             body,
   *             comments: [ { id, body } ], ...],
   *          }
   *
   * Throws NotFoundError if id not found
   */

  static async get(id) {
    const postRes = await db.query(
      `SELECT p.id, 
                p.username, 
                p.subject, 
                p.body,
                p.date, 
                CASE WHEN COUNT(c.id) = 0 THEN JSON '[]' ELSE JSON_AGG(
        JSON_BUILD_OBJECT('id', c.id, 'username', c.username, 'body', c.body, 'date', c.date)
    ) END AS comments
            FROM posts p
                LEFT JOIN comments c ON c.post_id = p.id
            WHERE p.id = $1
            GROUP BY p.id    
            ORDER BY p.id`,
      [id]
    );

    const post = postRes.rows[0];
    if (!post) throw new NotFoundError(`Post not found: ${id}`);

    return post;
  }

  /** Update post data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {username, subject, body}
   *
   * Returns {id, username, subject, body}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE posts 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, username, subject, body, date`;
    const result = await db.query(querySql, [...values, id]);
    const post = result.rows[0];

    if (!post) throw new NotFoundError(`No post found: ${id}`);

    return post;
  }

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM posts
           WHERE id = $1
           RETURNING id`,
      [id]
    );

    const post = result.rows[0];

    if (!post) throw new NotFoundError(`No post found: ${id}`);
  }
}

module.exports = Post;
