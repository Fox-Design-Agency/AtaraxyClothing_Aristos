const ProductCategory = require("../../productCategory");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the product categories in the Product Categories collection.
 * @param {object} stuff - The object of the stuff to find.
 * @return {promise} A promise that resolves with the product category that matches the stuff
 */
module.exports = stuff => {
  return ProductCategory.find(stuff).catch(err => {
    errorAddEvent(err, "product category query error");
  });
};

