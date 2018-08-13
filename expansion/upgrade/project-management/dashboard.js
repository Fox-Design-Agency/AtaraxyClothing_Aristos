// const getNotesCount = require("./models/queries/notes/CountNotes");
module.exports = {
  name: "project management",
  async theFunction(name, blogCount) {
    let notesCount, selfTasks, OpenTasks, CompletedTasks;
    await Promise.all([]).then(result => {
      notesCount = "-";
      selfTasks = "-";
      OpenTasks = "-";
      CompletedTasks = "-";
    });
    return `
    <div class="admin-blocks">
    <a href="/admin/project-management">
        <h5>
            ${name}
        </h5>
        <h4>
           notes: 
        </h4>
        <h5>
            ${notesCount}
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
