const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/* the logs stuffs */
const getAllInfoLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllInfo;
const getAllErrorLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllError;
const getAllDebugLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllDebug;

module.exports = {
  dashboardGET(req, res, next) {
    const allTheInfo = getAllInfoLogs();
    if (
      req.app.locals.projectManagementExists &&
      req.app.locals.contactManagementExists
    ) {
      const LatestThreeTasks = require("../../../../expansion/upgrade/project-management/models/queries/tasks/FindLatestThreeTasks")();
      const LatestThreeMessages = require("../../../../expansion/upgrade/contact/models/queries/FindLatestThreeMessages")();

      Promise.all([LatestThreeTasks, LatestThreeMessages]).then(result => {
        return res.render("../../../important/admin/views/index", {
          content: "",
          tasks: result[0],
          message: result[1],
          infoLogs: allTheInfo
        });
      });
    } else if (req.app.locals.projectManagementExists) {
      const LatestThreeTasks = require("../../../../expansion/upgrade/project-management/models/queries/tasks/FindLatestThreeTasks");
      LatestThreeTasks().then(tasks => {
        return res.render("../../../important/admin/views/index", {
          content: "",
          tasks: tasks,
          infoLogs: allTheInfo
        });
      });
    } else if (req.app.locals.contactManagementExists) {
      const LatestThreeMessages = require("../../../../expansion/upgrade/contact/models/queries/FindLatestThreeMessages");
      LatestThreeMessages().then(messages => {
        return res.render("../../../important/admin/views/index", {
          content: "",
          message: messages,
          infoLogs: allTheInfo
        });
      });
    } else {
      res.render("../../../important/admin/views/index", {
        content: "",
        infoLogs: allTheInfo
      });
    }
  } /* end of dashboardGET function */,
  dashboardLogCats(req, res, next) {
    let log;
    if (req.params.logname === "errors") {
      log = getAllErrorLogs();
    } else if (req.params.logname === "debug") {
      log = getAllDebugLogs();
    } else {
      log = getAllInfoLogs();
    }
    if (
      req.app.locals.projectManagementExists &&
      req.app.locals.contactManagementExists
    ) {
      const LatestThreeTasks = require("../../../../expansion/upgrade/project-management/models/queries/tasks/FindLatestThreeTasks")();
      const LatestThreeMessages = require("../../../../expansion/upgrade/contact/models/queries/FindLatestThreeMessages")();

      Promise.all([LatestThreeTasks, LatestThreeMessages]).then(result => {
        return res.render("../../../important/admin/views/index", {
          content: "",
          tasks: result[0],
          message: result[1],
          infoLogs: log
        });
      });
    } else if (req.app.locals.projectManagementExists) {
      const LatestThreeTasks = require("../../../../expansion/upgrade/project-management/models/queries/tasks/FindLatestThreeTasks");
      LatestThreeTasks().then(tasks => {
        return res.render("../../../important/admin/views/index", {
          content: "",
          tasks: tasks,
          infoLogs: log
        });
      });
    } else if (req.app.locals.contactManagementExists) {
      const LatestThreeMessages = require("../../../../expansion/upgrade/contact/models/queries/FindLatestThreeMessages");
      LatestThreeMessages().then(messages => {
        return res.render("../../../important/admin/views/index", {
          content: "",
          message: messages,
          infoLogs: log
        });
      });
    } else {
      res.render("../../../important/admin/views/index", {
        content: "",
        infoLogs: log
      });
    }
  } /* end of dashboardGETLogCats function */
};
