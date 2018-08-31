const fs = require("fs-extra");
const Tasks = fs.readJSONSync(
  "./expansion/upgrade/project-management/routes/checkers/taskModelRoutes.json"
).route;
const Task = require(Tasks);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds the latest three tasks in the Task collection.
 * @return {promise} A promise that resolves with the latest three tasks
 */
module.exports = () => {
  return Task.find({ completed: 0 })
    .sort({ _id: 1 })
    .populate("assigned")
    .limit(3)
    .catch(err => {
      errorAddEvent(err, "tasks query error");
    });
};