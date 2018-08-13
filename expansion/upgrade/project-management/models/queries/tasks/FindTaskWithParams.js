const Task = require("../../tasks");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all tasks that match stuff param in the Task collection.
 * @param {object} stuff - The object of the stuff to find.
 * @return {promise} A promise that resolves with all the tasks that matches the stuff param
 */
module.exports = stuff => {
  return Task.find(stuff).catch(err => {
    errorAddEvent(err, "tasks query error");
  });
};

