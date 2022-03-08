"use strict";

/** Routes for exercises. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");

const Exercise = require("../models/exerciseModel");
const exerciseNewSchema = require("../schemas/exerciseNew.json");
const exerciseSearchSchema = require("../schemas/exerciseSearch.json");
const exerciseUpdateSchema = require("../schemas/exerciseUpdate.json");

const router = new express.Router();

/** POST / { exercise } =>  { exercise }
 *
 * exercise should be { name, equipmentId, primaryMuscleId, secondaryMuscleId, description, instructions, imageUrl }
 *
 * Returns { id, name, equipmentId, primaryMuscleId, secondaryMuscleId, description, instructions, imageUrl  }
 *
 * Authorization required: admin
 */

router.post("/", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, exerciseNewSchema);

    // if json is not valid, return errors
    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    const exercise = await Exercise.create(req.body);
    return res.status(201).json({ exercise });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { exercises: [ { id, name, equipmentId, primaryMuscleId, secondaryMuscleId, description, instructions, imageUrl }, ...] }
 *
 * Can filter on provided search filters:
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get("/", async (req, res, next) => {
  const searchTerm = req.query;

  try {
    const validator = jsonschema.validate(searchTerm, exerciseSearchSchema);

    // if json is not valid, return errors
    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    // perform search
    const exercises = await Exercise.findAll(searchTerm);

    return res.json({ exercises });
  } catch (err) {
    return next(err);
  }
});

/** GET /[ id ]  =>  { exercise }
 *
 *  Returns { id, name, equipmentId, primaryMuscleId, secondaryMuscleId, description, instructions, imageUrl }
 *
 * Authorization required: none
 */

router.get("/:id", async (req, res, next) => {
  try {
    const exercise = await Exercise.get(req.params.id);

    return res.json({ exercise });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[id] { exercise } => { exercise }
 *
 * Patches exercise data.
 *
 * fields can be: { name, equipmentId, primaryMuscleId, secondaryMuscleId, description, instructions, imageUrl }
 *
 * Returns { id, name, equipmentId, primaryMuscleId, secondaryMuscleId, description, instructions, imageUrl }
 *
 * Authorization required: admin
 */

router.patch("/:id", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, exerciseUpdateSchema);

    if (!validator.valid) {
      const errs = validator.errors.map((er) => er.stack);

      throw new BadRequestError(errs);
    }

    const exercise = await Exercise.update(req.params.id, req.body);

    return res.json({ exercise });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id", ensureAdmin, async (req, res, next) => {
  try {
    await Exercise.remove(req.params.id);

    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
