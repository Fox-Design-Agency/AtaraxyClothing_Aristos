const getAllCompletedTask = require("./models/queries/tasks/FindAllCompletedTasks");
const getAllOpenTask = require("./models/queries/tasks/FindAllOpenTasks");
module.exports = {
  name: "project management",
  async theFunction(name) {
    let selfTasks, OpenTasks, CompletedTasks;
    await Promise.all([
      getAllOpenTask(),
      getAllCompletedTask()
    ]).then(result => {
      selfTasks ="-";
      OpenTasks = result[0].length;
      CompletedTasks = result[1].length;
    });
    return `
    <div class="admin-blocks">
    <a href="/admin/project-management">
        <h5>
            ${name}
        </h5>
        <h4>
            tasks for you: 
        </h4>
        <h5>
            ${selfTasks}
        </h5>
        <h4>
            total open tasks: 
        </h4>
        <h5>
            ${OpenTasks}
        </h5>
        <h4>
            total completed tasks: 
        </h4>
        <h5>
            ${CompletedTasks}
        </h5>
        </a>
    </div>
         `;
  }
};
