const adminProductCategories = require("./routes/admin_product_categories");
const adminProducts = require("./routes/admin_products");
module.exports = app => {
  if (app.locals.printfulPluginExists) {
    const printfulPlugin = require("../../plugins/printful/colors_sizes");
    app.use("/admin/printful", printfulPlugin);
  }

  /* set global cart on session */
  app.get("*", function(req, res, next) {
    res.locals.cart = req.session.cart;
    next();
  });
  /* end of global cart on session */

  app.use("/admin/product-categories", adminProductCategories);
  app.use("/admin/products", adminProducts);
};
