const Coupon = require("../../coupons");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Creates a single coupon in the Coupon collection.
 * @param {object} couponProps - Object containing ??
 * @return {promise} A promise that resolves with the coupon that was created
 */
module.exports = couponProps => {
  const coupon = new Coupon(couponProps);
  return coupon.save().catch(err => {
    console.log(err)
    errorAddEvent(err, "coupon query error");
  });
};