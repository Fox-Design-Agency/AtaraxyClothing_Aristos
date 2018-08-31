const fs = require("fs-extra");
const pluginChecker = require("../../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      plugin.forEach(theThings => {
        if (theThings.switch === "blogsSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/blog/routes/checkers/blogRoutes.json",
              {
                route: `../../plugins/${theThings.folder}/switchRoutes.js`
              }
            );
          } else {
            fs.pathExists(
              "./expansion/upgrade/blog/routes/checkers/blogRoutes.json",
              (err, exists) => {
                if (!exists) {
                  fs.writeJson(
                    "./expansion/upgrade/blog/routes/checkers/blogRoutes.json",
                    {
                      route: "./routes/admin_blogs"
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
      "./expansion/upgrade/blog/routes/checkers/blogRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/blog/routes/checkers/blogRoutes.json",
            {
              route: "./routes/admin_blogs"
            }
          );
        }
      }
    );
    fs.pathExists(
      "./expansion/upgrade/blog/routes/checkers/blogCommentRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/blog/routes/checkers/blogCommentRoutes.json",
            {
              route: "./routes/admin_blog_comments"
            }
          );
        }
      }
    );
    /* end of default routes path */
    /* default model routes */
    fs.pathExists(
      "./expansion/upgrade/blog/routes/checkers/blogModelMainRoute.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/blog/routes/checkers/blogModelMainRoute.json",
            {
              route: "../../blog"
            }
          );
        }
      }
    );
    fs.pathExists(
      "./expansion/upgrade/blog/routes/checkers/blogModelCommentRoute.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/blog/routes/checkers/blogModelCommentRoute.json",
            {
              route: "../../blogComments"
            }
          );
        }
      }
    );
     /* end of default model routes */
  }
};