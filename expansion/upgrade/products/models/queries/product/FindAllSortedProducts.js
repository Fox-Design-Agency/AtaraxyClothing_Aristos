const Product = require("../../product");
// Aristos Logger Path
// const Logger = require("../../../AristosLogger/AristosStuff/AristosLogger").Logger;

/**
 * Finds a single page in the Page collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the page that matches the id
 */
module.exports = () => {
  return Product.find({}).sort({ sorting: 1 })
};
