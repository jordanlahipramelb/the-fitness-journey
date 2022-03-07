"use strict";

/** Routes for authentication */

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");
const { createToken } = require("../helpers/tokens");

const User = require("../models/userModel");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");

/**  POST /auth/login: { username, password } => { token }
 *
 * Authenticates username and password of user.
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/login", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);

    // if json is not valid, return errors
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    // authenticate user in database
    const user = await User.authenticate(username, password);
    const token = createToken(user);

    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

/** POST /auth/register:    { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email, city, state, fitnessType, bio }
 *
 * Authorization required: none
 */

router.post("/register", async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userRegisterSchema);
    // if json is not valid, return errors
    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    // register user in database
    const newUser = await User.register({ ...req.body, isAdmin: false });
    const token = createToken(newUser);

    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
