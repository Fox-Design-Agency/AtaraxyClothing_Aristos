require("./routes/checkers/admin_blog_routes_checker").theFunction();
const adminBlogCategories = require("./routes/admin_blog_categories");

const fs = require("fs-extra");
const adminBlog = fs.readJSONSync(
  "./expansion/upgrade/blog/routes/checkers/blogRoutes.json"
).route;
const adminBlogComment = fs.readJSONSync(
  "./expansion/upgrade/blog/routes/checkers/blogCommentRoutes.json"
).route;
const adminBlogs = require(adminBlog);
const adminBlogComments = require(adminBlogComment)

module.exports = app => {
  app.use("/admin/blogs", adminBlogs);
  app.use("/admin/blog-categories", adminBlogCategories);
  app.use("/admin/blog-comments", adminBlogComments)
};