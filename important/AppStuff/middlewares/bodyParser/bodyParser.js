const bodyParser = require("body-parser");
module.exports = app => {
  /* Body Parser Middleware */
  /* Parse application/x-www-form-urlencoded */
  app.use(bodyParser.urlencoded({ extended: false }));
  /* Parse application/json */
  app.use(bodyParser.json());
};
