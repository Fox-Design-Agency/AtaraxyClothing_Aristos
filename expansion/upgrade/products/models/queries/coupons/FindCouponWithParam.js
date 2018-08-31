const fs = require("fs-extra");
const Coupons = fs.readJSONSync(
  "./expansion/upgrade/products/routes/checkers/productCouponModelRoutes.json"
).route;
const Coupon = require(Coupons);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all coupons that match the stuff param in the Coupon collection.
 * @param {object} stuff - The object of the stuff to search for.
 * @return {promise} A promise that resolves with the coupon that matches the id
 */
module.exports = stuff => {
  return Coupon.find(stuff).catch(err => {
    errorAddEvent(err, "coupon query error");
  });
};