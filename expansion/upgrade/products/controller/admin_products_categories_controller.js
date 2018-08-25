const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
//  Product category model Queries
const CountProductCategory = require("../models/queries/productCategory/CountProductCategories");
const FindAllProductCategories = require("../models/queries/productCategory/FindAllProductCategories");
const CreateProductCategory = require("../models/queries/productCategory/CreateProductCategory");
const EditProductCategory = require("../models/queries/productCategory/EditProductCategory");
const DeleteProductCategory = require("../models/queries/productCategory/DeleteProductCategory");
const FindProductCategoryWithParam = require("../models/queries/productCategory/FindProductCategoryWithParam");
const FindOneProductCategoryByID = require("../models/queries/productCategory/FindOneProductCategoryByID");
const SortProductCategories = require("../models/queries/productCategory/SortProductCategoryByID");
const FindAllSortedCategories = require("../models/queries/productCategory/FindAllSortedProductCategories");
// media queries
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");
// media categories Queries
// const FindAllMediaCategories = require("../../../../important/adminModels/queries/mediaCategories/FindAllMediaCategories");
//User Model Queries
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");
module.exports = {
  index(req, res, next) {
    Promise.all([CountProductCategory(), FindAllSortedCategories()]).then(
      result => {
        res.render(
          "../../../expansion/upgrade/products/views/categories/product_categories",
          {
            categories: result[1],
            count: result[0]
          }
        );
      }
    );
  }, // end of index function
  addIndex(req, res, next) {
    let title,
      author,
      description,
      keywords,
      imagePath = "";

    const AllMedia = FindAllMedia();
    AllMedia.then(media => {
      res.render(
        "../../../expansion/upgrade/products/views/categories/add_product_category",
        {
          title: title,
          author: author,
          description: description,
          keywords: keywords,
          imagePath: imagePath,
          media: media
        }
      );
    });
  }, // end of add index function
  create(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }
        let title = req.body.title;
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let author = req.session.passport.user;
        let description = req.body.description;
        let keywords = req.body.keywords;
        let imagePath = req.body.imagepath;

        if (errors.length > 0) {
          const AllMedia = FindAllMedia();
          AllMedia.then(media => {
            return res.render(
              "../../../expansion/upgrade/products/views/categories/add_product_category",
              {
                errors: errors,
                title: title,
                author: author,
                description: description,
                keywords: keywords,
                media: media
              }
            );
          });
        } else {
          const CheckIfExists = FindProductCategoryWithParam({ slug: slug });
          CheckIfExists.then(category => {
            if (category.length > 0) {
              errors.push({ text: "Category title exists, choose another." });
              const AllMedia = FindAllMedia();
              AllMedia.then(media => {
                return res.render(
                  "../../../expansion/upgrade/products/views/categories/add_product_category",
                  {
                    errors: errors,
                    title: "",
                    author: author,
                    description: description,
                    keywords: keywords,
                    media: media
                  }
                );
              });
            } else {
              const CategoryProps = {
                title: title,
                slug: slug,
                author: author,
                description: description,
                keywords: keywords,
                imagepath: imagePath
              };
              CreateProductCategory(CategoryProps);
              req.flash("success_msg", "Product Category Added!");
              res.redirect("/admin/product-categories");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  }, // end of create function
  editIndex(req, res, next) {
    Promise.all([FindOneProductCategoryByID(req.params.id), FindAllMedia()]).then(result => {
      res.render(
        "../../../expansion/upgrade/products/views/categories/edit_product_category",
        {
          title: result[0].title,
          id: result[0]._id,
          author: result[0].author,
          description: result[0].description,
          keywords: result[0].keywords,
          media: result[1],
          imagepath: result[0].imagepath
        }
      );
    });
  }, // end of edit index function
  edit(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }
        let title = req.body.title;
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let id = req.params.id;
        let description = req.body.description;
        let keywords = req.body.keywords;
        let imagepath = req.body.imagepath;

        if (errors.length > 0) {
          const AllMedia = FindAllMedia();
          AllMedia.then(media => {
            return res.render(
              "../../../expansion/upgrade/products/views/categories/edit_product_category",
              {
                errors: errors,
                title: title,
                id: id,
                media: media,
                description: description,
                keywords: keywords
              }
            );
          });
        } else {
          const CheckIfExists = FindProductCategoryWithParam({
            slug: slug,
            _id: { $ne: id }
          });
          CheckIfExists.then(category => {
            if (category.length > 0) {
              errors.push({ text: "Category title exists, chooser another." });
              const AllMedia = FindAllMedia();
              AllMedia.then(media => {
                return res.render(
                  "../../../expansion/upgrade/products/views/categories/edit_product_category",
                  {
                    errors: errors,
                    title: "",
                    id: id,
                    description: description,
                    keywords: keywords,
                    media: media
                  }
                );
              });
            } else {
              const CategoryProps = {
                title: title,
                slug: slug,
                description: description,
                keywords: keywords,
                imagepath: imagepath
              };
              EditProductCategory(id, CategoryProps);

              req.flash("success_msg", "Product Category Edited!");
              res.redirect("/admin/product-categories");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  }, // end of edit function
  delete(req, res, next) {
    //should also delete associated products
    DeleteProductCategory(req.params.id);
    req.flash("success_msg", "Product Category deleted!");
    res.redirect("/admin/product-categories");
  }, // end of delete function
  reorder(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let ids = req.body["id[]"];
        SortProductCategories(ids);
        /* look into this more */
        //   req.app.locals.pages = sortedRes;
      } else {
        res.redirect("/users/login");
      }
    });
  } //end of reorder function
};
