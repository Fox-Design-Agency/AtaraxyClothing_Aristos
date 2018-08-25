const fs = require("fs-extra");
const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger").addError;

/* Media Category Model Queries */
const FindAllMediaCategories = require("../../adminModels/queries/mediaCategories/FindAllMediaCategories");
const CountMediaCategories = require("../../adminModels/queries/mediaCategories/CountMediaCategories");
const FindMediaCategoryByParam = require("../../adminModels/queries/mediaCategories/FindMediaCategoryByParam");
const CreateMediaCategory = require("../../adminModels/queries/mediaCategories/CreateMediaCategory");
const FindMediaCategoryByID = require("../../adminModels/queries/mediaCategories/FindMediaCategoryByID");
const EditMediaCategory = require("../../adminModels/queries/mediaCategories/EditMediaCategory");
const DeleteMediaCategory = require("../../adminModels/queries/mediaCategories/DeleteMediaCategory");
/* User Model Queries */
const FindOneUserByID = require("../../adminModels/queries/user/FindOneUserWithID");

module.exports = {
  index(req, res, next) {
    CountMediaCategories().then(count => {
      if (count === 0) {
        CreateMediaCategory({
          title: "General",
          slug: "general"
        });
      }
      FindAllMediaCategories().then(categories => {
        res.render(
          "../../../important/admin/views/media/categories/media_categories",
          {
            categories: categories,
            count: count
          }
        );
      });
    });
  } /* end of get index function */,

  addIndex(req, res, next) {
    let title = "";
    res.render(
      "../../../important/admin/views/media/categories/add_media_category",
      {
        title: title
      }
    );
  } /* end of get add index function */,

  create(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }

        let title = req.body.title;
        let slug = title.replace(/s+/g, "-").toLowerCase();

        if (errors.length > 0) {
          return res.render(
            "../../../important/admin/views/media/categories/add_media_category",
            {
              errors: errors,
              title: title
            }
          );
        } else {
          FindMediaCategoryByParam({ slug: slug }).then(category => {
            if (category.length > 0) {
              errors.push({ text: "Category title exists, choose another." });
              res.render(
                "../../../important/admin/views/media/categories/add_media_category",
                {
                  title: title,
                  errors: errors
                }
              );
            } else {
              const CategoryProps = {
                title: title,
                slug: slug
              };
              CreateMediaCategory(CategoryProps);
              fs.ensureDir(
                "content/public/images/" + CategoryProps.title,
                err => {
                  if (err) {
                    addErrorEvent(err, "media cats create error");
                  }
                }
              );
              req.flash("success_msg", "Media Category added!");
              res.redirect("/admin/media-categories");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,

  editIndex(req, res, next) {
    FindMediaCategoryByID(req.params.id).then(category => {
      res.render(
        "../../../important/admin/views/media/categories/edit_media_category",
        {
          title: category.title,
          id: category._id
        }
      );
    });
  } /* end of edit index function */,

  saveEdit(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }
        let title = req.body.title;
        let slug = title.replace(/s+/g, "-").toLowerCase();
        let id = req.params.id;

        if (errors.length > 0) {
          return res.render(
            "../../../important/admin/views/media/categories/edit_media_category",
            {
              errors: errors,
              title: title,
              id: id
            }
          );
        } else {
          FindMediaCategoryByParam({
            slug: slug,
            _id: { $ne: id }
          }).then(category => {
            if (category.length > 0) {
              errors.push({ text: "Category title exists, choose another." });
              return res.render(
                "../../../important/admin/views/media/categories/edit_media_category",
                {
                  errors: errors,
                  title: title,
                  id: id
                }
              );
            } else {
              const CategoryProps = {
                title: title,
                slug: slug
              };
              EditMediaCategory(id, CategoryProps);
              req.flash("success_msg", "Media Categoriy Edited!");
              res.redirect("/admin/media-categories");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of save edit function */,

  delete(req, res, next) {
    //remove folder associated with category??
    //remove all associated images???
    DeleteMediaCategory(req.params.id);
    req.flash("success_msg", "Media Category Deleted!");
    res.redirect("back");
  } /* end of delete function */
};