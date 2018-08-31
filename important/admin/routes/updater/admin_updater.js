const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
/* update log */
const getAllUpdatesLog = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllUpdates;
/* controller */
/* no controller right now */
/* GET updater page  */
router.get("/", (req, res, next) => {
  res.render("../../../important/admin/views/updater/updater", {
    content: "",
    title: "",
    author: "",
    keywords: "",
    infoLogs: getAllUpdatesLog()
  });
});

/*
*   GET make updates
*/

router.get("/make-update/:update", (req, res, next) => {
  switch (req.params.update) {
    case "core":
      require("../../../AristosStuff/AristosUpdater/aristosUpdater").coreUpdate(req);
      break;
    case "expansions":
      require("../../../AristosStuff/AristosUpdater/aristosUpdater")
        .expansionUpdate(req);
      break;
    case "theme":
      require("../../../AristosStuff/AristosUpdater/aristosUpdater")
        .themeUpdate(req);
      break;
    default:
      break;
  }
  res.redirect("back")
});

/* Exports */
module.exports = router;