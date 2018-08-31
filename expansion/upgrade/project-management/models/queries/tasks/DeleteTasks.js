const fs = require("fs-extra");
const Tasks = fs.readJSONSync(
  "./expansion/upgrade/project-management/routes/checkers/taskModelRoutes.json"
).route;
const Task = require(Tasks);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single task from the Task collection
 * @param {objectID} _id - The ID of the task to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return Task.findByIdAndRemove(_id).catch(err => {
    errorAddEvent(err, "tasks query error");
  });
};