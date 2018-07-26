const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const LogController = require("../../controllers/logsViewer/admin_log_controller");
/*
* GET log index
*/
router.get("/", isAdmin, LogController.index);

/*
* GET log index
*/
router.get("/type/:logname", isAdmin, LogController.indexByCategory);


/*
* GET log index
*/
router.get("/clear/:logname", isAdmin, LogController.clearLog)

/* Exports */
module.exports = router;
