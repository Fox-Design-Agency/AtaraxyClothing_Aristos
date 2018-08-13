const BlogCategory = require("../../blogCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Sorts blog categories by ids.
 * @param {string} ids - The ID's of the avilable stuffs to sort with
 * @return {promise} A promise that resolves with the blog categories that were sorted?
 */
module.exports = ids => {
  return sortBlogCategories(ids, function() {
    BlogCategory.find({})
      .sort({ sorting: 1 })
      .catch(err => {
        errorAddEvent(err, "blog category query error");
      });
  });
}; /* end of exports */
/* Sort blog categories function */
/* rebuild so that blog categories sort in category view use all blog categories id to not mess up ordering */
function sortBlogCategories(ids, cb) {
  let count = 0;

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function(count) {
      BlogCategory.findById(id).then(category => {
        category.sorting = count;
        category.save();
        ++count;
        if (count >= ids.length) {
          cb();
        }
      });
    })(count);
  }
} /* end of sort pages function */
