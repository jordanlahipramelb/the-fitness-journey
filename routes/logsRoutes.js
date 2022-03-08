"use strict";

/** Routes for posts. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const {
  ensureAdminOrCorrectUser,
  ensureAdmin,
  ensureLoggedIn,
} = require("../middleware/auth");
const Log = require("../models/logModel");

const router = new express.Router();

/** GET / =>
 *  { logs: [ { id, date, username }, ... ] }
 *
 * Get all logs
 *
 * Authorization required: logged in user
 */

router.get("/", ensureLoggedIn, async (req, res, next) => {
  const searchTerm = req.query;

  try {
    // const validator = jsonschema.validate(searchTerm, routineSearchSchema);

    // // if json is not valid, return errors
    // if (!validator.valid) {
    //   const errs = validator.errors.map((er) => er.stack);

    //   throw new BadRequestError(errs);
    // }

    // perform search
    const logs = await Log.findAll(searchTerm);

    return res.json({ logs });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id] => { log }
 *
 * Get single log with entries
 *
 * Returns [ id, date, username, log_entries: [ { exerciseName, set_number, reps, weight }, ... ]  ]
 *
 * Authorization required: logged in user
 */

router.get("/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    const log = await Log.get(req.params.id);

    return res.json({ log });
  } catch (err) {
    return next(err);
  }
});

/** GET /:id/entries => { logEntries }
 *
 * Get entries of log
 *
 * Returns [ id, log_id, exercise_name, set_number, reps, weight ]
 *
 * Authorization required:
 */

router.get("/:id/entries", async (req, res, next) => {
  try {
    const logEntries = await Log.getLogEntries(req.params.id);

    return res.json({ logEntries });
  } catch (err) {
    return next(err);
  }
});

/** GET /routines-exercises => { routinesWithExercises }
 *
 * Get routines and its exercises
 *
 * Returns { id, routineId, routineName, exerciseName, dayOfWeek, reps, sets }
 *
 * Authorization required: logged in user
 */

router.get(
  "/:id/routines-exercises",
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      const routinesWithExercises = await Log.getRoutinesWithExercises();

      return res.json({ routinesWithExercises });
    } catch (err) {
      return next(err);
    }
  }
);

/** POST / { log } => { log }
 *
 * creates a new log name with username who created it
 *
 * Returns { id, date, username }
 *
 * Authorization required: logged in user
 */

router.post("/", ensureLoggedIn, async (req, res, next) => {
  try {
    // const validator = jsonschema.validate(req.body, routineNewSchema);

    // // if json is not valid, return errors
    // if (!validator.valid) {
    //   const errs = validator.errors.map((er) => er.stack);
    //   console.error("Error with creating new routine", errs);
    //   throw new BadRequestError(errs);
    // }

    const log = await Log.create(req.body);
    return res.status(201).json({ log });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[id] { log } => { log }
 *
 * Updates log data.
 *
 * fields can be: { date, username }
 *
 * Returns { id, date, username }
 *
 * Authorization required: same user or admin
 */

router.put("/:id", ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, routineUpdateSchema);

    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    const log = await Log.updateDate(req.params.id, req.body);

    return res.json({ log });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Deletes log data
 *
 * Authorization required: admin or correct user
 */

router.delete("/:id", ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    await Log.remove(req.params.id);

    return res.json({ success: true, deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

/** POST /[id]/add-entry { log } => { log }
 *
 *
 * adds entry to an existing log
 *
 * Authorization required: logged in user
 */

router.post("/add-entry", ensureAdminOrCorrectUser, async (req, res, next) => {
  try {
    const entry = await Log.addLogEntryToLog(req.body);

    return res.status(201).json({ entry });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Deletes an entry from log
 *
 * Authorization required: admin or correct user
 */

router.delete(
  "/entries/:id",
  ensureAdminOrCorrectUser,
  async (req, res, next) => {
    try {
      await Log.deleteLogEntryFromLog(req.params.id);

      return res.json({ success: true, deleted: req.params.id });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
