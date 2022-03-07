"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "fitness_journey_test"
    : process.env.DATABASE_URL || "fitness_journey";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
// WJB: Evaluate in 2021 if this should be increased to 13 for non-test use
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("FitnessJourney Config:".white.bgMagenta);
console.log("SECRET_KEY:".magenta, SECRET_KEY);
console.log("PORT:".magenta, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".magenta, BCRYPT_WORK_FACTOR);
console.log("Database:".magenta, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
