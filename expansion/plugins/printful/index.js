const colorsAndSizes = require("./colors_sizes/colors_sizes")

module.exports = app => {
  app.use("/admin/printful", colorsAndSizes);
};