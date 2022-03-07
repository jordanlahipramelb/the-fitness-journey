"use strict";

/** Server for app
 *
 * Defaults on port 3001
 */

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
  console.log(`Started on port ${PORT}`);
});
