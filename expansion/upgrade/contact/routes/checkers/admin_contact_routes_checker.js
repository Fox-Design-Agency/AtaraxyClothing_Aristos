const fs = require("fs-extra");
const pluginChecker = require("../../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      plugin.forEach(theThings => {
        if (theThings.switch === "contactSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/contact/routes/checkers/contactRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.pathExists(
              "./expansion/upgrade/contact/routes/checkers/contactRoutes.json",
              (err, exists) => {
                if (!exists) {
                  fs.writeJson(
                    "./expansion/upgrade/contact/routes/contactRoutes.json",
                    {
                      route: "./routes/admin_contact"
                    }
                  );
                }
              }
            );
          }
        }
      });
    });
    /* default contact routes */
    fs.pathExists(
      "./expansion/upgrade/contact/routes/checkers/contactRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/contact/routes/checkers/contactRoutes.json",
            {
              route: "./routes/admin_contact"
            }
          );
        }
      }
    );
    /* end of default contact routes */
    /* default contact model routes */
    fs.pathExists(
      "./expansion/upgrade/contact/routes/checkers/contactModelRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/contact/routes/checkers/contactModelRoutes.json",
            {
              route: "../contactMessage"
            }
          );
        }
      }
    );
     /* end of default contact model routes */
  }
};