"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, city, state, fitness_type, bio, image_url, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username,
                password,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                city, 
                state,
                fitness_type AS "fitnesstype",
                bio,
                image_url AS "imageUrl",
                is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, city, state, fitnessType, bio, image_url, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({
    username,
    password,
    firstName,
    lastName,
    email,
    city,
    state,
    fitnessType,
    bio,
    imageUrl,
    isAdmin,
  }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password,
            first_name,
            last_name,
            email,
            city, 
            state, 
            fitness_type, 
            bio, 
            image_url, 
            is_admin)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
              RETURNING username, 
                        first_name AS "firstName", 
                        last_name AS "lastName", 
                        email, 
                        city, 
                        state,
                        fitness_type AS "fitnessType",
                        bio,
                        image_url AS "imageUrl",
                        is_admin AS "isAdmin"`,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        city,
        state,
        fitnessType,
        bio,
        imageUrl,
        isAdmin,
      ]
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username, firstName, lastName, email, city, state, fitnessType, bio, image_url, isAdmin }, ...]
   **/

  static async findAll() {
    const result = await db.query(
      `SELECT username, 
                first_name AS "firstName", 
                last_name AS "lastName", 
                email, 
                city, 
                state,
                fitness_type AS "fitnessType",
                bio,
                image_url AS "imageUrl",
                is_admin AS "isAdmin"
           FROM users
           ORDER BY username`
    );

    return result.rows;
  }

  //? Add routines object ///////////////////////
  /** Given a username, return data about user.
   *
   * Returns { username, firstName, lastName, email, city, state, fitnessType, bio, image_url, isAdmin, routines }
   *   where routines is
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
      `SELECT  users.username, 
              users.first_name AS "firstName", 
              users.last_name AS "lastName", 
              users.email, 
              users.city, 
              users.state,
              users.fitness_type AS "fitnessType",
              users.bio,
              users.image_url AS "imageUrl",
              users.is_admin AS "isAdmin",
              CASE WHEN COUNT(routines.id) = 0 THEN JSON '[]' ELSE JSON_AGG(
                JSON_BUILD_OBJECT('id', routines.id, 'name', routines.name)
            ) END AS routines,
              CASE WHEN COUNT(logs.id) = 0 THEN JSON '[]' ELSE JSON_AGG(
                JSON_BUILD_OBJECT('id', logs.id, 'date', logs.date)
            ) END AS logs
            FROM users
              LEFT JOIN routines ON routines.username = users.username 
              LEFT JOIN logs ON users.username = logs.username 
            WHERE users.username = $1
            GROUP BY users.username
            ORDER BY users.username`,
      [username]
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { username, firstName, lastName, email, city, state, fitnessType, bio, image_url, isAdmin }
   *
   * Returns { username, firstName, lastName, email, city, state, fitnessType, bio, image_url, isAdmin }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */

  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      firstName: "first_name",
      lastName: "last_name",
      fitnessType: "fitness_type",
      imageUrl: "image_url",
      isAdmin: "is_admin",
    });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                email,
                                city, 
                                state,
                                fitness_type AS "fitnessType",
                                bio,
                                image_url AS "imageUrl",
                                is_admin AS "isAdmin"`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username]
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }
}

module.exports = User;
