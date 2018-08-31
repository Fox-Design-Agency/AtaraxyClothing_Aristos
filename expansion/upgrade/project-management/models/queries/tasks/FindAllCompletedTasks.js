const fs = require("fs-extra");
const Tasks = fs.readJSONSync(
  "./expansion/upgrade/project-management/routes/checkers/taskModelRoutes.json"
).route;
const Task = require(Tasks);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the tasks in the Task collection.
 * @return {promise} A promise that resolves with all the tasks
 */
module.exports = () => {
  return Task.find({ completed: 1 })
    .populate("assigned")
    .catch(err => {
      errorAddEvent(err, "tasks query error");
    });
};