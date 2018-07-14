const Blog = require("../../blog");
/* Aristos Logger Path */
// const Logger = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;
/**
 * Sorts blogs by ids.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the page that matches the id
 */
module.exports = ids => {
  return sortBlogs(ids, function() {
    Blog.find({}).sort({ sorting: 1 });
  });
}; /* end of exports */
/* Sort pages function */
/* rebuild so that pages sort in category view use all pages id to not mess up ordering */
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
