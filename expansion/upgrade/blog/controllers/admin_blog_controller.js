const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/* Blog Model Queries */
const CountBlog = require("../models/queries/blog/CountBlog");
const FindAllBlogs = require("../models/queries/blog/FindAllBlogs");
const FindBlogWithParam = require("../models/queries/blog/FindBlogWithParam");
const CreateBlog = require("../models/queries/blog/CreateBlog");
const FindBlogByID = require("../models/queries/blog/FindOneBlogByID");
const EditBlog = require("../models/queries/blog/EditBlog");
const DeleteBlog = require("../models/queries/blog/DeleteBlog");
const SortBlogsByID = require("../models/queries/blog/SortBlogsByID");
const FindAllSortedBlogs = require("../models/queries/blog/FindAllSortedBlogs");
/* Media Model Queries */
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");
const FindAllMediaWithParam = require("../../../../important/admin/adminModels/queries/media/FindAllMediaWithParam");
/* Blog Category Model Queries */
const FindAllBlogCategories = require("../models/queries/blogCategory/FindAllBlogCategory");
/* Blog Comment Model Queries */
const DeleteBlogCommentsByBlog = require("../models/queries/blogComments/DeleteBlogCommentByBlog");
/* User Model Queries */
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");

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
  } /* end of index function */,

  addIndex(req, res, next) {
    let title,
      slug,
      content,
      author,
      description,
      keywords = "";
    const AllBlogCategories = FindAllBlogCategories();
    const AllMedia = FindAllMedia();
    Promise.all([AllBlogCategories, AllMedia]).then(result => {
      res.render("../../../expansion/upgrade/blog/views/add_blog", {
        title: title,
        slug: slug,
        content: content,
        categories: result[0],
        media: result[1],
        author: author,
        description: description,
        keywords: keywords
      });
    });
  } /* end of add index function */,

  create(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }
        if (!req.body.content) {
          errors.push({ text: "Content must have a value." });
        }

        let title = req.body.title;
        let slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
        if (slug == "") {
          slug = title.replace(/\s+/g, "-").toLowerCase();
        }
        let content = req.body.content;
        let category = req.body.category;
        let author = req.session.passport.user;
        let description = req.body.description;
        let keywords = req.body.keywords;
        let allowComments;

        if (req.body.allowComments === "on") {
          allowComments = true;
        } else {
          allowComments = false;
        }

        if (errors.length > 0) {
          const AllBlogCategories = FindAllBlogCategories();
          const AllMedia = FindAllMedia();
          Promise.all([AllBlogCategories, AllMedia]).then(result => {
            return res.render(
              "../../../expansion/upgrade/blog/views/add_blog",
              {
                errors: errors,
                title: title,
                slug: slug,
                content: content,
                categories: result[0],
                media: result[1],
                author: author,
                description: description,
                keywords: keywords
              }
            );
          });
        } else {
          const CheckIfExists = FindBlogWithParam({ slug: slug });
          CheckIfExists.then(blog => {
            if (blog.length > 0) {
              errors.push({ text: "Blog slug exists, choose another." });
              const AllBlogCategories = FindAllBlogCategories();
              const AllMedia = FindAllMedia();
              Promise.all([AllBlogCategories, AllMedia]).then(result => {
                return res.render(
                  "../../../expansion/upgrade/blog/views/add_blog",
                  {
                    errors: errors,
                    title: "",
                    slug: "",
                    content: content,
                    categories: result[0],
                    media: result[1],
                    author: author,
                    description: description,
                    keywords: keywords
                  }
                );
              });
            } else {
              const BlogParams = {
                title: title,
                slug: slug,
                content: content,
                category: category,
                author: author,
                sorting: 0,
                description: description,
                keywords: keywords,
                allowComments: allowComments
              };
              CreateBlog(BlogParams);
              req.flash("success_msg", "Blog added!");
              res.redirect("/admin/blogs");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,

  editIndex(req, res, next) {
    const AllBlogCategories = FindAllBlogCategories();
    const AllMedia = FindAllMedia();
    const OneBlog = FindBlogByID(req.params.id);
    Promise.all([AllBlogCategories, AllMedia, OneBlog]).then(result => {
      res.render("../../../expansion/upgrade/blog/views/edit_blog", {
        title: result[2].title,
        slug: result[2].slug,
        content: result[2].content,
        categories: result[0],
        id: result[2]._id,
        media: result[1],
        description: result[2].description,
        keywords: result[2].keywords,
        selectedCat: result[2].category.slug,
        allowComments: result[2].allowComments
      });
    });
  } /* end of edit index function */,

  edit(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }
        if (!req.body.content) {
          errors.push({ text: "Content must have a value." });
        }

        let title = req.body.title;
        let slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
        if (slug == "") {
          slug = title.replace(/\s+/g, "-").toLowerCase();
        }
        let content = req.body.content;
        let id = req.params.id;
        let category = req.body.category;
        let description = req.body.description;
        let keywords = req.body.keywords;

        let allowComments;
        if (typeof req.body.allowComments === "undefined") {
          allowComments = false;
        } else {
          allowComments = true;
        }

        if (errors.length > 0) {
          const AllBlogCategories = FindAllBlogCategories();
          const AllMedia = FindAllMedia();
          Promise.all([AllBlogCategories, AllMedia]).then(result => {
            return res.render(
              "../../../expansion/upgrade/blog/views/edit_blog",
              {
                errors: errors,
                title: title,
                slug: slug,
                content: content,
                categories: result[0],
                media: result[1],
                id: id,
                description: description,
                keywords: keywords,
                selectedCat: category
              }
            );
          });
        } else {
          const CheckIfExists = FindBlogWithParam({
            slug: slug,
            _id: { $ne: id }
          });
          CheckIfExists.then(blog => {
            if (blog.length > 0) {
              errors.push({ text: "Blog slug exists, chooser another." });
              return res.render(
                "../../../expansion/upgrade/blog/views/edit_blog",
                {
                  errors: errors,
                  title: title,
                  slug: slug,
                  content: content,
                  categories: result[0],
                  media: result[1],
                  id: id,
                  description: description,
                  keywords: keywords,
                  selectedCat: category
                }
              );
            } else {
              const BlogParams = {
                title: title,
                slug: slug,
                content: content,
                category: category,
                description: description,
                keywords: keywords,
                allowComments: allowComments
              };
              EditBlog({ _id: id }, BlogParams);

              req.flash("success_msg", "Blog edited!");
              res.redirect("/admin/blogs");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of edit function */,

  delete(req, res, next) {
    Promise.all([
      DeleteBlog(req.params.id),
      DeleteBlogCommentsByBlog(req.params.id)
    ]).then(result => {
      req.flash("success_msg", "Blog deleted!");
      res.redirect("/admin/blogs/");
    });
  } /* end of delete function */,

  reorder(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let ids = req.body["id[]"];
        SortBlogsByID(ids);
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of reorder function */
};
