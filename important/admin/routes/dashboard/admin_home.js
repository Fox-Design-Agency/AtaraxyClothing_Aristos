const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const DashboardController = require("../../controllers/dashboard/admin_home_controller");

/*
* GET pages index
*/
router.get("/", isAdmin, DashboardController.dashboardGET);
/*
* GET log variations
*/
router.get(
  "/dashboard/:logname",
  isAdmin,
  DashboardController.dashboardLogCats
);

/* Exports */
module.exports = router;
