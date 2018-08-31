const fs = require("fs-extra");
const Tasks = fs.readJSONSync(
  "./expansion/upgrade/project-management/routes/checkers/taskModelRoutes.json"
).route;
const Task = require(Tasks);
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