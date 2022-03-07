"use strict";

/** Convenient middleware functions to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Authenticate User.
 *
 * If a JWtoken is provided; verify it.
 * If valid; store the token payload on res.locals (this will include the username and isAdmin field.)
 *
 * It is not an error if no token is provided or if the token is not valid.
 */

const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers && req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();

      // token stored in res.locals
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }

    return next();
  } catch (err) {
    return next();
  }
};

/** Requires user to be logged in.
 *
 * If not logged in, raise Unauthorized 401.
 */

const ensureLoggedIn = (req, res, next) => {
  try {
    //   if no token is stored
    if (!res.locals.user) throw new UnauthorizedError();

    return next();
  } catch (err) {
    return next(err);
  }
};

/** Requires user to be an admin.
 *
 * If not, raise Unauthorized 401
 */

const ensureAdmin = (req, res, next) => {
  try {
    //  if no user token stored OR if user token is not an admin
    if (!res.locals.user || !res.locals.user.isAdmin)
      throw new UnauthorizedError();

    return next();
  } catch (err) {
    return next(err);
  }
};

/** Require user to be an admin or that user.
 *
 * If not, raises Unauthorized.
 */

const ensureAdminOrCorrectUser = (req, res, next) => {
  try {
    //   user stored in res.locals
    const user = res.locals.user;

    // if no user is stored AND if user is not admin/user not user in params
    if (!user && !(user.isAdmin || user.username === req.params.username)) {
      throw new UnauthorizedError();
    }

    return next();
  } catch (err) {
    return next();
  }
};

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureAdminOrCorrectUser,
};
