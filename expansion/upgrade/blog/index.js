require("./routes/admin_blog_routes_checker").theFunction();
const adminBlogCategories = require("./routes/admin_blog_categories");
const adminBlogComments = require("./routes/admin_blog_comments")

const fs = require("fs-extra");
const adminBlog = fs.readJSONSync(
  "./expansion/upgrade/blog/routes/blogRoutes.json"
).route;
const adminBlogs = require(adminBlog);

module.exports = app => {
  app.use("/admin/blogs", adminBlogs);
  app.use("/admin/blog-categories", adminBlogCategories);
  app.use("/admin/blog-comments", adminBlogComments)
};
