const adminProductCategories = require("./routes/admin_product_categories");
require("./routes/checkers/admin_products_routes_checker").theFunction();
const fs = require("fs-extra");
const adminProduct = fs.readJSONSync(
  "./expansion/upgrade/products/routes/checkers/productRoutes.json"
).route;
const adminProducts = require(adminProduct);
const adminProductCoupon = fs.readJSONSync(
  "./expansion/upgrade/products/routes/checkers/productCouponRoutes.json"
).route;
const adminProductCoupons = require(adminProductCoupon);
const adminProductOrder = fs.readJSONSync(
  "./expansion/upgrade/products/routes/checkers/productOrderRoutes.json"
).route;
const adminProductOrders = require(adminProductOrder);

module.exports = app => {
  /* set global cart on session */
  app.get("*", function(req, res, next) {
    res.locals.cart = req.session.cart;
    next();
  });
  /* end of global cart on session */
  app.use("/admin/product-categories", adminProductCategories);
  app.use("/admin/products/coupons", adminProductCoupons);
  app.use("/admin/products/orders", adminProductOrders);

  app.use("/admin/products", adminProducts);
};