const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/* GET Blog category model */

/* GET blog model */
const CountBlog = require("../models/queries/blog/CountBlog");

module.exports = {
  index(req, res, next) {
    const Count = CountBlog();
    const AllSortedBlogs = FindAllSortedBlogs();
    Promise.all([Count, AllSortedBlogs]).then(result => {
      res.render("../../../expansion/upgrade/blog/views/blogs", {
        blogs: result[1],
        count: result[0]
      });
    });
  } /* end of index function */
};
