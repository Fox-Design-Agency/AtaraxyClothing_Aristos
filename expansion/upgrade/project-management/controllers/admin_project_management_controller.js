const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/* task model Queries */
const CountTasks = require("../models/queries/tasks/CountTasks");
const FindAllTasks = require("../models/queries/tasks/FindAllTasks");
const DeleteTask = require("../models/queries/tasks/DeleteTasks");
const CreateTask = require("../models/queries/tasks/CreateTasks");
const EditTask = require("../models/queries/tasks/EditTasks");
const FindOneTaskByID = require("../models/queries/tasks/FindOneTaskByID");
const CompleteTask = require("../models/queries/tasks/CompleteTask");
/* media model Queries */
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");
/* User Model Queries */
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");
const FindUserByParams = require("../../../../important/admin/adminModels/queries/user/FindUserWithParam");

module.exports = {
  index(req, res, next) {
    Promise.all([FindAllTasks(), CountTasks()]).then(result => {
      res.render(
        "../../../expansion/upgrade/project-management/views/project-management",
        {
          content: "",
          tasks: result[0],
          count: result[1]
        }
      );
    });
  } /* end of index function */,

  addIndex(req, res, index) {
    let taskName,
      content,
      assigned = "";
    let completed = 0;
    const adminUsers = FindUserByParams({ admin: 1 });
    const AllMedia = FindAllMedia();
    Promise.all([adminUsers, AllMedia]).then(result => {
      res.render(
        "../../../expansion/upgrade/project-management/views/tasks/add_task",
        {
          content: "",
          taskName: taskName,
          content: content,
          assigned: assigned,
          completed: completed,
          user: result[0],
          media: result[1]
        }
      );
    });
  } /* end of add index function */,

  create(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];

        if (!req.body.taskName) {
          errors.push({ text: "Title must have a value." });
        }
        if (!req.body.content) {
          errors.push({ text: "Content must have a value." });
        }

        let taskName = req.body.taskName;
        let content = req.body.content;
        let assigned = req.body.assigned;

        if (errors.length > 0) {
          const adminUsers = FindUserByParams({ admin: 1 });
          const AllMedia = FindAllMedia();
          Promise.all([adminUsers, AllMedia]).then(result => {
            return res.render(
              "../../../expansion/upgrade/project-management/views/tasks/add_task",
              {
                errors: errors,
                taskName: taskName,
                assigned: assigned,
                content: content,
                user: result[0],
                media: result[1]
              }
            );
          });
        } else {
          const TaskProps = {
            title: taskName,
            assigned: assigned,
            content: content,
            completed: 0
          };
          CreateTask(TaskProps);
          req.flash("success_msg", "Task added!");
          res.redirect("/admin/project-management");
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,

  editIndex(req, res, next) {
    Promise.all([
      FindUserByParams({ admin: 1 }),
      FindOneTaskByID(req.params.id),
      FindAllMedia()
    ]).then(result => {
      res.render(
        "../../../expansion/upgrade/project-management/views/tasks/edit_task",
        {
          content: "",
          taskName: result[1].title,
          assigned: result[1].assigned,
          content: result[1].content,
          user: result[0],
          id: result[1]._id,
          media: result[2]
        }
      );
    });
  } /* end of edit index function */,

  edit(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.taskName) {
          errors.push({ text: "Title must have a value." });
        }
        if (!req.body.content) {
          errors.push({ text: "Content must have a value." });
        }

        let taskName = req.body.taskName;
        let content = req.body.content;
        let assigned = req.body.assigned;
        let id = req.params.id;

        if (errors.length > 0) {
          const Admins = FindUSerByParams({ admin: 1 });
          const AllMedia = FindAllMedia();
          Promise.all([Admins, AllMedia]).then(result => {
            return res.render(
              "../../../expansion/upgrade/project-management/views/tasks/add_task",
              {
                errors: errors,
                taskName: taskName,
                assigned: assigned,
                content: content,
                user: result[0],
                media: result[2]
              }
            );
          });
        } else {
          const TaskProps = {
            title: taskName,
            content: content,
            assigned: assigned
          };
          EditTask(id, TaskProps);
          req.flash("success_msg", "Task Edited!");
          res.redirect("/admin/project-management");
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of edit function */,
  /* need to change to query model */
  complete(req, res, next) {
    CompleteTask(req.params.id).then(stuff => {
      req.flash("success_msg", "Task Completed!");
      res.redirect("/admin/project-management");
    });
  } /* end of complete function */,

  delete(req, res, next) {
    DeleteTask(req.params.id);
    req.flash("success_msg", "Task Deleted!");
    res.redirect("/admin/project-management");
  } /* end of delete function */
};
