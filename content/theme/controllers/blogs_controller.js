//GET blog category model
const findBlogCategoryWithParam = require("../../../expansion/upgrade/blog/models/queries/blogCategory/FindBlogCategoryWithParam");
// GET page model
const findAllPages = require("../../../important/admin/adminModels/queries/page/FindAllPages");
//GET blogs model
const findAllBlogs = require("../../../expansion/upgrade/blog/models/queries/blog/FindAllBlogs");
const findBlogWithParam = require("../../../expansion/upgrade/blog/models/queries/blog/FindBlogWithParam");

module.exports = {
  index(req, res, next) {
    let slug = req.params.slug;
    const allPages = findAllPages({});
    const allBlogs = findAllBlogs();
    Promise.all([allPages, allBlogs]).then(result => {
      if (result[0].length < 1) {
        res.redirect("/");
      } else {
        res.render("blog/blog", {
          title: result[0].title,
          content: result[0].content,
          keywords: result[0].keywords,
          description: result[0].description,
          author: result[0].author,
          blogs: result[1]
        });
      }
    });
  },
  singleBlog(req, res, next) {
    let slug = req.params.slug;
    findBlogWithParam({ slug: slug }).then(blog => {
      if (blog.length < 1) {
        res.redirect("/");
      } else {
        res.render("blog/blogpage", {
          title: blog.title,
          content: blog.content,
          keywords: blog.keywords,
          description: blog.description,
          author: blog.author
        });
      }
    });
  },
  blogByCategory(req, res, next) {
    let categorySlug = req.params.category;

    const BlogCategory = findBlogCategoryWithParam({ slug: categorySlug });
    const foundblogs = findBlogWithParam({ category: categorySlug });
    Promise.all([BlogCategory, foundblogs]).then(result => {
      res.render("blog/cat_blogs", {
        title: result[0].title,
        description: result[0].description,
        author: result[0].author,
        keywords: result[0].keywords,
        blogs: result[1],
        categorySlug: categorySlug
      });
    });
  }
};
