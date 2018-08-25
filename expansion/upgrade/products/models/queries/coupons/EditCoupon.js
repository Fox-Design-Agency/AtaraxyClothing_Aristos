const Coupon = require("../../coupons");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single coupon in the Coupon collection
 * @param {string} _id - The ID of the order to edit.
 * @param {object} couponProps - Object containing ??
 * @return {promise} A promise that resolves when the coupon is edited
 */
module.exports = (_id, couponProps) => {
  return Coupon.findByIdAndUpdate({ _id }, couponProps).catch(err => {
    errorAddEvent(err, "coupon query error");
  });
};