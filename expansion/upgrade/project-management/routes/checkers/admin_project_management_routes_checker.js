const fs = require("fs-extra");
const pluginChecker = require("../../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      plugin.forEach(theThings => {
        if (theThings.switch === "projectManaSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/project-management/routes/checkers/projectManaRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.pathExists(
              "./expansion/upgrade/project-management/routes/checkers/projectManaRoutes.json",
              (err, exists) => {
                if (!exists) {
                  fs.writeJson(
                    "./expansion/upgrade/project-management/routes/checkers/projectManaRoutes.json",
                    {
                      route: "./routes/admin_project_management.js"
                    }
                  );
                }
              }
            );
          }
        }
      });
    });
    /* default project management routes */
    fs.pathExists(
      "./expansion/upgrade/project-management/routes/checkers/projectManaRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/project-management/routes/checkers/projectManaRoutes.json",
            {
              route: "./routes/admin_project_management.js"
            }
          );
        }
      }
    );
    /* end of default project management routes */
    /* default project management Model routes */
    fs.pathExists(
      "./expansion/upgrade/project-management/routes/checkers/taskModelRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/project-management/routes/checkers/taskModelRoutes.json",
            {
              route: "../../tasks.js"
            }
          );
        }
      }
    );
    /* end of default project management Model routes */
  }
};