const ProductCategory = require("../../productCategory");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single product category from the Product Category collection
 * @param {string} _id - The ID of the product category to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return ProductCategory.findByIdAndRemove(_id).catch(err => {
    errorAddEvent(err, "product category query error");
  });
};