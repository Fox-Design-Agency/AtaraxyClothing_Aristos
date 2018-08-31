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
 * Creates a single product in the Product collection.
 * @param {object} productProps - Object containing title, slug, price, category, author, conbtent, description, keywords, image
 * @return {promise} A promise that resolves with the Product that was created
 */
module.exports = productProps => {
  const product = new Product(productProps);
  return product.save().catch(err => {
    errorAddEvent(err, "product query error");
  });
};