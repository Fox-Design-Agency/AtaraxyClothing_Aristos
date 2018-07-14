const express = require("express");
const router = express.Router();
const auth = require("../../../../important/AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const contactController = require("../controllers/admin_contact_controller");

/*
* GET, POST contact form
*/
router
  .route("/")
  .get(isAdmin, contactController.index)
  .post(contactController.create);

/* Exports */
module.exports = router;
