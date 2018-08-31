const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const userControlsController = require("../../controllers/userControls/admin_user_controls_controller");
/*
* GET user controls index
*/
router.get("/", isAdmin, userControlsController.index);

/*
* GET, POST add admin user
*/
router
  .route("/add-admin")
  .get(isAdmin, userControlsController.addIndex)
  .post(userControlsController.createAdmin);
/* 
* POST regular user
*/
router.post("/register-user", userControlsController.createUser);

/*
* GET, POST edit admin user
*/
router
  .route("/edit-admin/:id")
  .get(isAdmin, userControlsController.editIndex)
  .post(userControlsController.saveEdit);

/*
* GET remove admin user
*/
router.delete("/remove-admin/:id", isAdmin, userControlsController.remove);

/* Exports */
module.exports = router;