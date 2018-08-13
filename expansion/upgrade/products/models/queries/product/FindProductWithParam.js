const Product = require("../../product");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the products that match the stuff param in the Product collection.
 * @param {object} object - The object of the stuff to find.
 * @return {promise} A promise that resolves with all the products that match the stuff param
 */
module.exports = stuff => {
  return Product.find(stuff).catch(err => {
    errorAddEvent(err, "product query error");
  });
};

