const path = require("path");
module.exports = app => {
  /* Start of view engine setup */
  /* this should probably be dynamic to allow for more themes to be used */
  app.set("views", path.join(__dirname, "../../../content/theme/views"));
  app.set("view engine", "ejs");
};
