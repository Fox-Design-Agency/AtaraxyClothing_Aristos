const Task = require("../../tasks");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Create a single task in the Task collection.
 * @param {object} taskProps - Object containing ??
 * @return {promise} A promise that resolves with the Task that was created
 */
module.exports = taskProps => {
  const task = new Task(taskProps);
  return task.save().catch(err => {
    errorAddEvent(err, "tasks query error");
  });
};
