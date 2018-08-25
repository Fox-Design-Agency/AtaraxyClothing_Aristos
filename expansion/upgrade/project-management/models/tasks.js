const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
/* Task Schema */
const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  assigned: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  published:{
    type: String,
    default: moment().format("dddd, MMM Do YYYY")
  },
  finished:{
    type: String
  },
  completed: {
    type: Number
  },
  content: {
    type: String,
    required: true
  }
}); /* end of task schema */

module.exports = mongoose.model("Task", TaskSchema);
