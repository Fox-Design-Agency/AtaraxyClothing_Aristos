const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/* GET Blog category model */

/* Blog Comments stuffs */
const CountBlogComments = require("../models/queries/blogComments/CountBlogComments");
const GetAllCommentsByPost = require("../models/queries/blogComments/GetAllCommentsByPost");
const CreateBlogComment = require("../models/queries/blogComments/CreateBlogComment");
const DeleteComment = require("../models/queries/blogComments/DeleteBlogComment");

/* Media Model Queries */
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");

module.exports = {
  indexByPost(req, res, next) {
    let id = req.params.id;
    Promise.all([
      CountBlogComments(),
      GetAllCommentsByPost(req.params.id)
    ]).then(result => {
      res.render(
        "../../../expansion/upgrade/blog/views/comments/blog_comments",
        {
          comments: result[1],
          count: result[0],
          id: id
        }
      );
    });
  } /* end of index function */,
  addIndex(req, res, next) {
    let title,
      content,
      author = "";
    let id = req.params.id;

    FindAllMedia().then(media => {
      res.render(
        "../../../expansion/upgrade/blog/views/comments/add_blog_comment",
        {
          content: content,
          author: author,
          media: media,
          id: id
        }
      );
    });
  } /* end of add index function */,
  addCreate(req, res, next) {
    let errors = [];
    if (!req.body.content) {
      errors.push({ text: "Content must have a value." });
    }
    let content = req.body.content;
    let author = req.session.passport.user;
    let id = req.params.id;

    if (errors.length > 0) {
      Promise.all([FindAllMedia()]).then(result => {
        return res.render(
          "../../../expansion/upgrade/blog/views/comments/add_blog_comment",
          {
            errors: errors,
            content: content,
            media: result[0]
          }
        );
      });
    } else {
      const BlogCommentParams = {
        content: content,
        user: author,
        blogref: id
      };
      CreateBlogComment(BlogCommentParams);
      req.flash("success_msg", "Blog Comment added!");
      res.redirect("/admin/blogs");
    }
  } /* end of add create function */,

  delete(req, res, next) {
    DeleteComment(req.params.id).then(() => {
      req.flash("success_msg", "Blog Comment deleted!");
      res.redirect("/admin/blogs");
    });
  }
};