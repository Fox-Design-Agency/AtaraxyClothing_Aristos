const ProductCategory = require("../../productCategory");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the product categories in the Product Categories collection.
 * @return {promise} A promise that resolves with all the product category
 */
module.exports = () => {
  return ProductCategory.find({}).catch(err => {
    errorAddEvent(err, "product category query error");
  });
};