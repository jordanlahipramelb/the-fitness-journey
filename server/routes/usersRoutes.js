"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();

const { BadRequestError } = require("../expressError");
const {
  ensureAdminOrCorrectUser,
  ensureLoggedIn,
  ensureAdmin,
} = require("../middleware/auth");
const { createToken } = require("../helpers/tokens");

const User = require("../models/userModel");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

/** POST / { user } => { user, token }
 *
 * Allow admins to add a new user, either as a regular user or an admin.
 *
 * Returns the newly created user and an authentication code for them: { user: { username, password, firstName, lastName, email, city, state, fitnessType, bio, imageUrl, isAdmin }, token }
 *
 * Authorization Required: admin
 */

router.post("/", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    // if json is not valid, return errors
    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);

    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

/** GET / => { users: [ {username, password, firstName, lastName, email, city, state, fitnessType, bio, imageUrl }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: logged in
 **/

router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const users = await User.findAll();

    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin, routines, fitnessType }
 *   where routines is { id, name, username }
 *
 * Authorization required: logged in
 **/

router.get("/:username", ensureLoggedIn, async (req, res, next) => {
  try {
    const user = await User.get(req.params.username);

    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email, city, state, fitnessType, bio, imageUrl }
 *
 * Returns { username, firstName, lastName, email, city, state, fitnessType, bio, imageUrl, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username", ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);

    // if json is not valid, return errors
    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);

    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete(
  "/:username",
  ensureAdminOrCorrectUser,
  async function (req, res, next) {
    try {
      await User.remove(req.params.username);

      return res.json({ deleted: req.params.username });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
