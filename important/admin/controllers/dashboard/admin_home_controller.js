const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/* site stats stuff */
const getAllTheStats = require("../../../AristosStuff/AristosSiteStats/AristosSiteStats")
  .readAllStats;
/* the logs stuffs */
const getAllInfoLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllInfo;
const getAllErrorLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllError;
const getAllDebugLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllDebug;
const getAllUpdateLogs = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .readAllUpdates;
/* grab the dashboard stuff from upgrades */

module.exports = {
  dashboardGET(req, res, next) {
    const allTheStats = getAllTheStats();
    const allTheInfo = getAllInfoLogs();
    let totalViews, siteViews, FrontEndViews;
    allTheStats.forEach(stat => {
      switch (stat.name) {
        case "TotalSiteViews":
          siteViews = stat.data;
          break;
        case "SitePageViews":
          totalViews = stat.data;
          break;
        case "frontEndViews":
          FrontEndViews = stat.data;
          break;
        default:
          break;
      }
    });
    const upgradeDashboards = (function() {
      delete require.cache[
        require.resolve("../../../../expansion/upgrade/dashboard")
      ];
      return require("../../../../expansion/upgrade/dashboard");
    })();
    upgradeDashboards.then(startIncepting => {
      Promise.all(startIncepting).then(OneLevelDeep => {
        res.render("../../../important/admin/views/index", {
          content: "",
          infoLogs: allTheInfo,
          siteViews: siteViews,
          totalViews: totalViews,
          FrontEndViews: FrontEndViews,
          upgradeDashboard: OneLevelDeep
        });
      });
    });
  } /* end of dashboardGET function */,
  dashboardLogCats(req, res, next) {
    let log;
    let totalViews, siteViews, FrontEndViews;
    if (req.params.logname === "errors") {
      log = getAllErrorLogs();
    } else if (req.params.logname === "debug") {
      log = getAllDebugLogs();
    } else if (req.params.logname === "updates") {
      log = getAllUpdateLogs();
    } else {
      log = getAllInfoLogs();
    }
    const allTheStats = getAllTheStats();
    allTheStats.forEach(stat => {
      switch (stat.name) {
        case "TotalSiteViews":
          siteViews = stat.data;
          break;
        case "SitePageViews":
          totalViews = stat.data;
          break;
        case "frontEndViews":
          FrontEndViews = stat.data;
          break;
        default:
          break;
      }
    });
    const upgradeDashboards = (function() {
      delete require.cache[
        require.resolve("../../../../expansion/upgrade/dashboard")
      ];
      return require("../../../../expansion/upgrade/dashboard");
    })();
    upgradeDashboards.then(startIncepting => {
      Promise.all(startIncepting).then(OneLevelDeep => {
        res.render("../../../important/admin/views/index", {
          content: "",
          infoLogs: log,
          siteViews: siteViews,
          totalViews: totalViews,
          FrontEndViews: FrontEndViews,
          upgradeDashboard: OneLevelDeep
        });
      });
    });
  } /* end of dashboardGETLogCats function */
};

