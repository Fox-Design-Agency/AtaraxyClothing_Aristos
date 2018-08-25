const Task = require("../../tasks");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the tasks in the Task collection.
 * @return {promise} A promise that resolves with all the tasks
 */
module.exports = () => {
  return Task.find({ completed: 0 })
    .populate("assigned")
    .catch(err => {
      errorAddEvent(err, "tasks query error");
    });
};
