const Task = require("../../tasks");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single task in the Task collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the task that matches the id
 */
module.exports = _id => {
  return Task.findById(_id).catch(err => {
    errorAddEvent(err, "tasks query error");
  });
};
