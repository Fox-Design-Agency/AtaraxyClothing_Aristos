const Task = require("../../tasks");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the tasks in the Task collection.
 * @return {promise} A promise that resolves with all the tasks
 */
module.exports = user => {
  return Task.find({ assigned: user, completed: 0 })
    .populate("assigned")
    .catch(err => {
      errorAddEvent(err, "tasks query error");
    });
};
