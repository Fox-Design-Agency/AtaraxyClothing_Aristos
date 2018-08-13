const Task = require("../../tasks");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Count the tasks in the Task collection.
 * @return {promise} A promise that resolves with the count
 */
module.exports = () => {
  return Task.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "tasks query error");
    });
};
