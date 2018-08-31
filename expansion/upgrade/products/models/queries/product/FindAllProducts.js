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
 * Finds all the products in the Product collection.
 * @return {promise} A promise that resolves with all the products
 */
module.exports = () => {
  return Product.find({})
    .populate("category")
    .populate("author")
    .catch(err => {
      errorAddEvent(err, "product query error");
    });
};