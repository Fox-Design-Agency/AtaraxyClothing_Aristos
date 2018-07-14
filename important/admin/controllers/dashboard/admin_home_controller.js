const Logger = require("../../../AristosStuff/AristosLogger/AristosLogger").Logger;
/* task model Queries */
const GetLatestThreeTasks = require("../../../../expansion/upgrade/project-management/models/queries/tasks/FindLatestThreeTasks");

/* contact message model Queries */
const GetLatestThreeMessages = require("../../../../expansion/upgrade/contact/models/queries/FindLatestThreeMessages");

module.exports = {
  dashboardGET(req, res, next) {
    // needs to work without these expansion upgrades too
    const LatestThreeTasks = GetLatestThreeTasks();
    const LatestThreeMessages = GetLatestThreeMessages();
    Promise.all([LatestThreeTasks, LatestThreeMessages]).then(result => {
      res.render("../../../important/admin/views/index", {
        content: "",
        tasks: result[0],
        message: result[1]
      });
    });
  } /* end of dashboardGET function */
};
