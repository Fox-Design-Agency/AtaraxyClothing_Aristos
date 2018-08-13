const updateStats = require("../../../AristosStuff/AristosSiteStats/AristosSiteStats")
  .updateStats;
module.exports = app => {
  app.use(function(req, res, next) {
    if (
      typeof req.user === "undefined" ||
      req.user.admin !== 1
    ) {
      updateStats(1, "frontEndViews");
    }
    next();
  });
};

        