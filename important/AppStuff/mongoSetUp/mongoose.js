const mongoose = require("mongoose");
const config = require("../config/config.js");
const errorAddEvent = require("../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
module.exports = () => {
  /* this sets mongoose promise handling to the native js promise */
  mongoose.Promise = global.Promise;
  /* Start Connect to db */
  mongoose
    .connect(
      config.read("database"),
      {
        useNewUrlParser: true
      }
    )
    .then(() => console.log("MongoDB Connected...."))
    .catch(err => errorAddEvent(err, "Mongo db connection error"));
  /* end of mongoose initialization */
};