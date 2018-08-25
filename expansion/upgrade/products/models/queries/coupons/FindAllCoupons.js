const Coupon = require("../../coupons");
// Aristos Logger Path
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