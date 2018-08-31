const fs = require("fs-extra");
const Coupons = fs.readJSONSync(
  "./expansion/upgrade/products/routes/checkers/productCouponModelRoutes.json"
).route;
const Coupon = require(Coupons);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the coupons in the Coupon collection.
 * @return {promise} A promise that resolves with all the coupons
 */
module.exports = () => {
  return Coupon.find({}).catch(err => {
    errorAddEvent(err, "coupon query error");
  });
};