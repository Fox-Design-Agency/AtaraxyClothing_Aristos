const fs = require("fs-extra");
const pluginChecker = require("../../../../../expansion/plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      plugin.forEach(theThings => {
        if (theThings.switch === "mediaSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./important/admin/routes/checkers/media/MediaRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.pathExists(
              "./important/admin/routes/checkers/media/MediaRoutes.json",
              (err, exists) => {
                if (!exists) {
                  fs.writeJson(
                    "./important/admin/routes/checkers/media/MediaRoutes.json",
                    {
                      route: "./routes/media/admin_add_media"
                    }
                  );
                }
              }
            );
          }
        }
      });
    });
    /* default routes path */
    fs.pathExists(
      "./important/admin/routes/checkers/media/MediaRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./important/admin/routes/checkers/media/MediaRoutes.json",
            {
              route: "./routes/media/admin_add_media"
            }
          );
        }
      }
    );
    /* end of default routes path */
    /* default model routes */
    fs.pathExists(
      "./important/admin/routes/checkers/media/MediaModelRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./important/admin/routes/checkers/media/MediaModelRoutes.json",
            {
              route: "../../medias"
            }
          );
        }
      }
    );
    /* end of default model routes */
  }
};