const adminBlogs = require("./routes/admin_blogs");
const adminBlogCategories = require("./routes/admin_blog_categories");
// const adminBlogComments = require("./blog/routes/admin_blog_comments")
module.exports = app => {
  app.use("/admin/blogs", adminBlogs);
  app.use("/admin/blog-categories", adminBlogCategories);
  // app.use("/admin/blog-comments", adminBlogComments)
};
