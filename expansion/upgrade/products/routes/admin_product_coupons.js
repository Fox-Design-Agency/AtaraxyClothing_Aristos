const express = require("express");
const router = express.Router();
const auth = require("../../../../important/AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const couponsController = require("../controller/admin_products_coupons_controller");

/*
* GET Coupon index
*/
router.get("/", isAdmin, couponsController.index);
/*
* GET, POST add Coupon 
*/
router
  .route("/add-coupon")
  .get(isAdmin, couponsController.addIndex)
  .post(couponsController.create);

/*
* GET edit Coupon 
*/
router
  .route("/edit-coupon/:id")
  .get(isAdmin, couponsController.editIndex)
  .post(couponsController.edit);

/*
* GET delete Coupon
*/
router.delete(
  "/delete-Coupon/:id",
  isAdmin,
  couponsController.delete
);

module.exports = router;
