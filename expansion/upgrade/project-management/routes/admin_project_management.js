const express = require("express");
const router = express.Router();

const auth = require("../../../../important/AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const projectManagementController = require("../controllers/admin_project_management_controller");

/*
* GET project management index
*/
router.get("/", isAdmin, projectManagementController.index);

/*
* GET, POST add tasks
*/
router
  .route("/add-task")
  .get(isAdmin, projectManagementController.addIndex)
  .post(projectManagementController.create);

/*
* GET, POST edit task
*/
router
  .route("/edit-task/:id")
  .get(isAdmin, projectManagementController.editIndex)
  .post(projectManagementController.edit);

/*
* POST complete a task
*/
router.get("/complete-task/:id", projectManagementController.complete);

/*
* GET delete task
*/
router.delete("/delete-task/:id", isAdmin, projectManagementController.delete);

/* Exports */
module.exports = router;
