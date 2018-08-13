const Task = require("../../tasks");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single task in the Task collection
 * @param {string} _id - The ID of the task to edit.
 * @param {object} taskProps - An object with ??
 * @return {promise} A promise that resolves when the task is edited
 */
module.exports = (_id, taskProps) => {
  return Task.findByIdAndUpdate({ _id }, taskProps).catch(err => {
    errorAddEvent(err, "tasks query error");
  });
};
