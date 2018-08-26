const fs = require("fs-extra");
const pluginChecker = require("../../../../plugins");
module.exports = {
  async theFunction() {
    await pluginChecker.then(plugin => {
      plugin.forEach(theThings => {
        if (theThings.switch === "productsSwitch") {
          if (theThings.switchRoutes === "true") {
            fs.writeJson(
              "./expansion/upgrade/products/routes/checkers/productRoutes.json",
              {
                route: `../../plugins/${
                  theThings.folder
                }/routes/products/admin_products.js`,
                addView: `../../../plugins/${
                  theThings.folder
                }/viewAdds/products/productsAdd`,
                editView: `../../../plugins/${
                  theThings.folder
                }/viewAdds/products/productsEdit`
              }
            );
          } else {
            fs.pathExists(
              "./expansion/upgrade/products/routes/checkers/productRoutes.json",
              (err, exists) => {
                if (!exists) {
                  fs.writeJson(
                    "./expansion/upgrade/products/routes/checkers/productRoutes.json",
                    {
                      route: "./routes/admin_products",
                      addView: `../../../plugins/${
                        theThings.folder
                      }/viewAdds/products/productsAdd`,
                      editView: `../../../plugins/${
                        theThings.folder
                      }/viewAdds/products/productsEdit`
                    }
                  );
                }
              }
            );
          }
        }
      });
    });
    fs.pathExists(
      "./expansion/upgrade/products/routes/checkers/productRoutes.json",
      (err, exists) => {
        if (!exists) {
          fs.writeJson(
            "./expansion/upgrade/products/routes/checkers/productRoutes.json",
            {
              route: "./routes/admin_products",
              addView: `./pluginsViews/productAddPlugins.ejs`
            }
          );
        }
      }
    );
  }
};
