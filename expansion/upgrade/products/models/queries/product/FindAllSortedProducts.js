const Product = require("../../product");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the products sorted in the Product collection.
 * @return {promise} A promise that resolves with all the sorted products
 */
module.exports = () => {
  return Product.find({})
    .sort({ sorting: 1 })
    .catch(err => {
      errorAddEvent(err, "product query error");
    });
};

