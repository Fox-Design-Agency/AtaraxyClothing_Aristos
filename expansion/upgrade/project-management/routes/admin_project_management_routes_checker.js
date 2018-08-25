const fs = require("fs-extra");
const pluginChecker = require("../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      fs.ensureFile(
        "./expansion/upgrade/project-management/routes/projectManaRoutes.json",
        err => {
          fs.writeJson(
            "./expansion/upgrade/project-management/routes/projectManaRoutes.json",
            {
              route: "./routes/admin_project_management.js"
            }
          );
        }
      );
      plugin.forEach(theThings => {
        if (theThings.switch === "projectManaSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/project-management/routes/projectManaRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.ensureFile(
              "./expansion/upgrade/project-management/routes/projectManaRoutes.json",
              err => {
                fs.writeJson(
                  "./expansion/upgrade/project-management/routes/projectManaRoutes.json",
                  {
                    route: "./routes/admin_project_management.js"
                  }
                );
              }
            );
          }
        }
      });
    });
  }
};
