"use strict";

/** Express app for Fitness Journey */

const express = require("express");
const cors = require("cors");
const path = require("path");
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
const morgan = require("morgan");
const app = express();

/** Routes */
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");
const exercisesRoutes = require("./routes/exercisesRoutes");
const postsRoutes = require("./routes/postsRoutes");
const postsCommentsRoutes = require("./routes/postsCommentsRoutes");
const routineRoutes = require("./routes/routinesRoutes");
const logRoutes = require("./routes/logsRoutes");
/*******/

app.use("api/auth", authRoutes);
app.use("api/athletes", usersRoutes);
app.use("api/exercises", exercisesRoutes);
app.use("api/forum", postsRoutes);
/**  mergeParams route for comments to access post_id*/
app.use("api/forum/:post_id/comments", postsCommentsRoutes);
app.use("api/routines", routineRoutes);
app.use("api/logs", logRoutes);

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

/** Deploying to Heroku */

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

/** End Deploying to Heroku */

/** Handle 404 errors -- this matches everything */
app.use((req, res, next) => {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
