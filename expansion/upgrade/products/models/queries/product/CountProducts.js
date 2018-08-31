const fs = require("fs-extra");
let Product;
try {
  const Products = fs.readJSONSync(
    "./expansion/upgrade/products/routes/checkers/productModelRoutes.json"
  ).route;
  Product = require(Products);
} catch (err) {
  Product = require("../../product");
}
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Counts the products in the Products collection.
 * @return {promise} A promise that resolves with the product that was created
 */
module.exports = () => {
  return Product.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "product query error");
    });
};
