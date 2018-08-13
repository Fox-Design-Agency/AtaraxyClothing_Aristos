const Product = require("../../product");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single product in the Product collection
 * @param {string} _id - The ID of the product to edit.
 * @param {object} artistProps - An object with title, slug, price, category, author, conbtent, description, keywords, image
 * @return {promise} A promise that resolves when the product is edited
 */
module.exports = (_id, productProps) => {
  return Product.findByIdAndUpdate({ _id }, productProps).catch(err => {
    errorAddEvent(err, "product query error");
  });
};
