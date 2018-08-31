const ProductCategory = require("../../productCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Counts the product categories in the Product Category collection.
 * @return {promise} A promise that resolves with the count
 */
module.exports = () => {
  return ProductCategory.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "product category query error");
    });
};