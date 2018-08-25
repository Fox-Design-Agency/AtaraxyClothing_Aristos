const fs = require("fs-extra");
const pluginChecker = require("../../../plugins");
module.exports = {
  async theFunction() {
    fs.ensureFile(
        "./expansion/upgrade/contact/routes/contactRoutes.json",
        err => {
          fs.writeJson(
            "./expansion/upgrade/contact/routes/contactRoutes.json",
            {
              route: "./routes/admin_contact"
            }
          );
        }
      );
    await pluginChecker.then(plugin => {
      plugin.forEach(theThings => {
        if (theThings.switch === "contactSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/contact/routes/contactRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.ensureFile(
              "./expansion/upgrade/contact/routes/contactRoutes.json",
              err => {
                fs.writeJson(
                  "./expansion/upgrade/contact/routes/contactRoutes.json",
                  {
                    route: "./routes/admin_contact"
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