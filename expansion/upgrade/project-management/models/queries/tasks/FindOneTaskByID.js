const fs = require("fs-extra");
const Tasks = fs.readJSONSync(
  "./expansion/upgrade/project-management/routes/checkers/taskModelRoutes.json"
).route;
const Task = require(Tasks);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all tasks that match stuff param in the Task collection.
 * @param {object} stuff - The object of the stuff to find.
 * @return {promise} A promise that resolves with all the tasks that matches the stuff param
 */
module.exports = stuff => {
  return Task.findById(stuff)
    .populate("assigned")
    .catch(err => {
      errorAddEvent(err, "tasks query error");
    });
};