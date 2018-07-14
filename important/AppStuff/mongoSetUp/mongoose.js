const mongoose = require("mongoose");
const config = require("../config/config.js");
module.exports = () => {
  /* this sets mongoose promise handling to the native js promise */
  mongoose.Promise = global.Promise;
  /* Satrt Connect to db */
  mongoose
    .connect(config.read("database"))
    .then(() => console.log("MongoDB Connected...."))
    .catch(err => console.log(err));
  /* end of mongoose initialization */
};
