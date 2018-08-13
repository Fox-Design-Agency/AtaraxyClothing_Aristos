const ProductCategory = require("../../productCategory");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the sorted product categories in the Product Category collection.
 * @return {promise} A promise that resolves with the sorted product categories
 */
module.exports = () => {
  return ProductCategory.find({})
    .sort({ sorting: 1 })
    .catch(err => {
      errorAddEvent(err, "product category query error");
    });
};

