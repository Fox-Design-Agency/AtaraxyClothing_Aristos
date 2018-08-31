const fs = require("fs-extra");
const Coupons = fs.readJSONSync(
  "./expansion/upgrade/products/routes/checkers/productCouponModelRoutes.json"
).route;
const Coupon = require(Coupons);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single coupon in the Coupon collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the coupon that matches the id
 */
module.exports = _id => {
  return Coupon.findById(_id).catch(err => {
    errorAddEvent(err, "coupon query error");
  });
};