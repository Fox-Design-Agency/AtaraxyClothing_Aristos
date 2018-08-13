const Product = require("../../product");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds sorted products with a param in the Product collection.
 * @param {object} stuff- The object of the stuff to find.
 * @return {promise} A promise that resolves with all the sorted products that match the stuff param
 */
module.exports = stuffs => {
  return Product.find(stuffs)
    .sort({ sorting: 1 })
    .catch(err => {
      errorAddEvent(err, "product query error");
    });
};

