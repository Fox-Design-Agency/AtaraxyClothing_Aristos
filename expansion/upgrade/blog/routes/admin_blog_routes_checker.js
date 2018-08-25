const fs = require("fs-extra");
const pluginChecker = require("../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      fs.ensureFile("./expansion/upgrade/blog/routes/blogRoutes.json", err => {
        fs.writeJson("./expansion/upgrade/blog/routes/blogRoutes.json", {
          route: "./routes/admin_blogs"
        });
      });
      plugin.forEach(theThings => {
        if (theThings.switch === "blogsSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson("./expansion/upgrade/blog/routes/blogRoutes.json", {
              route: `../../plugins/${theThings.folder}/switchRoutes.js`
            });
          } else {
            fs.ensureFile(
              "./expansion/upgrade/blog/routes/blogRoutes.json",
              err => {
                fs.writeJson(
                  "./expansion/upgrade/blog/routes/blogRoutes.json",
                  {
                    route: "./routes/admin_blogs"
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
