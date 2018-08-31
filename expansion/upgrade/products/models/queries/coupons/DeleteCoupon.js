const fs = require("fs-extra");
const Coupons = fs.readJSONSync(
  "./expansion/upgrade/products/routes/checkers/productCouponModelRoutes.json"
).route;
const Coupon = require(Coupons);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single coupon from the Coupon collection
 * @param {string} _id - The ID of the coupon to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return Coupon.findByIdAndRemove(_id).catch(err => {
    errorAddEvent(err, "coupon query error");
  });
};