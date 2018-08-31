const ProductCategory = require("../../productCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single product category in the Product Category collection
 * @param {string} _id - The ID of the product category to edit.
 * @param {object} productCategoryProps - Object containing title, slug, author, image, descriptoin, keywords
 * @return {promise} A promise that resolves when the product category is edited
 */
module.exports = (_id, productCategoryProps) => {
  return ProductCategory.findByIdAndUpdate({ _id }, productCategoryProps).catch(
    err => {
      errorAddEvent(err, "product category query error");
    }
  );
};