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
 * Deletes a single order from the ORder collection
 * @param {string} _id - The ID of the order to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return Order.findByIdAndRemove(_id).catch(err => {
    errorAddEvent(err, "order query error");
  });
};