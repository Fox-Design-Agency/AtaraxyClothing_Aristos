const Task = require("../../tasks");
const moment = require("moment");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single task in the Task collection
 * @param {string} _id - The ID of the task to edit.
 * @param {object} taskProps - An object with ??
 * @return {promise} A promise that resolves when the task is edited
 */
module.exports = (_id) => {
  return Task.findByIdAndUpdate({ _id }, {completed: 1, finished: moment().format("dddd, MMM Do YYYY")}).catch(err => {
    errorAddEvent(err, "tasks query error");
  });
};
