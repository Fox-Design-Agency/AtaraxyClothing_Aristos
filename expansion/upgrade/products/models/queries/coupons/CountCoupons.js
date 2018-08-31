const fs = require("fs-extra");
const Coupons = fs.readJSONSync(
  "./expansion/upgrade/products/routes/checkers/productCouponModelRoutes.json"
).route;
const Coupon = require(Coupons);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Counts the coupons in the Coupon collection.
 * @return {promise} A promise that resolves with the Coupon that was created
 */
module.exports = () => {
  return Coupon.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "coupon query error");
    });
};