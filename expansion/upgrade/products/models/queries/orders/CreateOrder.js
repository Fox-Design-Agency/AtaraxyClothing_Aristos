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
 * Creates a single order in the Order collection.
 * @param {object} orderProps - Object containing user, total, shipping, name, address, city, state, zip, status, items
 * @return {promise} A promise that resolves with the order that was created
 */
module.exports = orderProps => {
  const order = new Order(orderProps);
  return order.save().catch(err => {
    errorAddEvent(err, "order query error");
  });
};