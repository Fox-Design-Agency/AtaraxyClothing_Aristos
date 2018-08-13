const Product = require("../../product");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single product from the Product collection
 * @param {string} _id - The ID of the product to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return Product.findByIdAndRemove(_id).catch(err => {
    errorAddEvent(err, "product query error");
  });
};

