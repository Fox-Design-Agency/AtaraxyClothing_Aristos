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
 * Finds a single order in the Order collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the order that matches the id
 */
module.exports = _id => {
  return Order.findById(_id).catch(err => {
    errorAddEvent(err, "order query error");
  });
};