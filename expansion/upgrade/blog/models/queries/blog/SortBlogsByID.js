const Blog = require("../../blog");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Sorts blogs by ids.
 * @param {string} ids - The id's available to sort with
 * @return {promise} A promise that resolves when the sorting is finished
 */
module.exports = ids => {
  return sortBlogs(ids, function() {
    Blog.find({}).sort({ sorting: 1 }).catch(err=>{
      errorAddEvent(err, "blog query error")
    });
  });
}; /* end of exports */
/* Sort blogs function */
/* rebuild so that blogs sort in category view use all blogs id to not mess up ordering */
function sortBlogs(ids, cb) {
  let count = 0;

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function(count) {
      Blog.findById(id).then(blog => {
        blog.sorting = count;
        blog.save();

        ++count;
        if (count >= ids.length) {
          cb();
        }
      });
    })(count);
  }
} /*end of sort pages function */
