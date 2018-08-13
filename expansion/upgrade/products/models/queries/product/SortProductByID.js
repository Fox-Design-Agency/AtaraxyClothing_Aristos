/* not a thing yet */
const Product = require("../../product");
// Aristos Logger Path
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Sorts products by ids.
 * @param {string} ids - The ids of the records to sort.
 * @return {promise} A promise that resolves with the sorted products
 */
module.exports = ids => {
  return sortProducts(ids, function() {
    Product.find({})
      .sort({ sorting: 1 })
      .catch(err => {
        errorAddEvent(err, "product query error");
      });
  });
}; //* end of exports */

// Sort product function
function sortProducts(ids, cb) {
  let count = 0;

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function(count) {
      Product.findById(id, function(err, product) {
        if (err) {
          errorAddEvent(err);
        }
        product.sorting = count;
        product.save(function(err) {
          if (err) {
            errorAddEvent(err);
          }

          ++count;
          if (count >= ids.length) {
            cb();
          }
        });
      });
    })(count);
  }
}

