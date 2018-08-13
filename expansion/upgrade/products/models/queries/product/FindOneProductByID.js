const Product = require("../../product");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single product in the Product collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the product that matches the id
 */
module.exports = _id => {
  return Product.findById(_id).catch(err => {
    errorAddEvent(err, "product query error");
  });
};

