const fs = require("fs-extra");
let Order;
try {
  const Orders = fs.readJSONSync(
    "./expansion/upgrade/products/routes/checkers/productOrderModelRoutes.json"
  ).route;
  Order = require(Orders);
} catch (err) {
  Order = require("../../orders");
}
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all orders that match the stuff param in the Order collection.
 * @param {object} stuff - The object of the stuff to search for.
 * @return {promise} A promise that resolves with the coupon that matches the id
 */
module.exports = stuff => {
  return Order.find(stuff).catch(err => {
    errorAddEvent(err, "order query error");
  });
};