const express = require("express");
const router = express.Router();

//GET blog category model
const findBlogCategoryWithParam = require("../../../expansion/upgrade/blog/models/queries/blogCategory/FindBlogCategoryWithParam");
// GET page model
const findAllPages = require("../../../important/admin/adminModels/queries/page/FindAllPages");
//GET blogs model
const findAllBlogs = require("../../../expansion/upgrade/blog/models/queries/blog/FindAllBlogs");
const findBlogWithParam = require("../../../expansion/upgrade/blog/models/queries/blog/FindBlogWithParam");

/*
* GET blog index
*/

router.get("/", function(req, res) {
  let slug = req.params.slug;
  const allPages = findAllPages({});
  const allBlogs = findAllBlogs();
  Promise.all([allPages, allBlogs]).then(result => {
    if (!page) {
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
});

/*
* GET a blog
*/
router.get("/:category/:slug", function(req, res) {
  let slug = req.params.slug;
  findBlogWithParam({ slug: slug }).then(blog => {
    if (!blog) {
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
});

/*
* GET blogs by category
*/

router.get("/:category", function(req, res) {
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
});

//Exports
module.exports = router;
