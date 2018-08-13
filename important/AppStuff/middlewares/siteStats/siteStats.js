const updateStats = require("../../../AristosStuff/AristosSiteStats/AristosSiteStats")
  .updateStats;

module.exports = app => {
  app.use(function(req, res, next) {
    updateStats(1, "SitePageViews");
    next();
  });
  app.use(function(req, res, next) {
    if (req.session.views !== 1) {
      updateStats(1, "TotalSiteViews");
      req.session.views = 1;
    }
    next();
  });
};
