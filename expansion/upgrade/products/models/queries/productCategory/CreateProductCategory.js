const ProductCategory = require("../../productCategory");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Creates a single product category in the Product Category collection.
 * @param {object} pageProps - Object containing title, slug, author, image, descriptoin, keywords
 * @return {promise} A promise that resolves with the product category that was created
 */
module.exports = productCategoryProps => {
  const productCategory = new ProductCategory(productCategoryProps);
  return productCategory.save().catch(err => {
    errorAddEvent(err, "product category query error");
  });
};
