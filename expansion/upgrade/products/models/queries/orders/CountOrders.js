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
 * Counts the orders in the Order collection.
 * @return {promise} A promise that resolves with the ORder that was created
 */
module.exports = () => {
  return Order.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "order query error");
    });
};
