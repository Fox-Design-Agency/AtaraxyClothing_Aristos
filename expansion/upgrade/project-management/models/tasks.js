const mongoose = require("mongoose");

/* Task Schema */
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  assigned: {
    type: String
  },
  published:{
      type: Date,
      default: Date.now
  },
  completed: {
    type: Date
  },
  content: {
    type: String,
    required: true
  }
}); /* end of task schema */

module.exports = mongoose.model("Task", TaskSchema);
