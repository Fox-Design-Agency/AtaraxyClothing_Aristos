const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/*  coupon model Queries */
const CountCoupons = require("../models/queries/coupons/CountCoupons");
const FindAllCoupons = require("../models/queries/coupons/FindAllCoupons");
const CreateCoupon = require("../models/queries/coupons/CreateCoupon");
const FindOneCouponsByID = require("../models/queries/coupons/FindOneCoupon");
const DeleteCoupon = require("../models/queries/coupons/DeleteCoupon");
const FindCouponWithParams = require("../models/queries/coupons/FindCouponWithParam");
/* product category queries */
const GetAllProductCats = require("../models/queries/productCategory/FindAllProductCategories");

// media queries
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");
//User Model Queries
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");
module.exports = {
  index(req, res, next) {
    Promise.all([CountCoupons(), FindAllCoupons()]).then(result => {
      res.render("../../../expansion/upgrade/products/views/coupons/coupons", {
        count: result[0],
        coupons: result[1]
      });
    });
  } /* end of index function */,
  addIndex(req, res, next) {
    let title,
      author,
      description,
      keywords = "";
    let quantity = -1;

    Promise.all([FindAllMedia(), GetAllProductCats()]).then(result => {
      res.render(
        "../../../expansion/upgrade/products/views/coupons/add_coupons",
        {
          title: title,
          author: author,
          description: description,
          keywords: keywords,
          quantity: quantity,
          media: result[0],
          categories: result[1]
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
        let quantity = req.body.quantity;
        let productCat = req.body.category;

        if (errors.length > 0) {
          Promise.all([FindAllMedia(), GetAllProductCats()]).then(result => {
            res.render(
              "../../../expansion/upgrade/products/views/coupons/add_coupons",
              {
                title: title,
                author: author,
                description: description,
                quantity: quantity,
                media: result[0],
                categories: result[1]
              }
            );
          });
        } else {
          const CheckIfExists = FindCouponWithParams({ title: title });
          CheckIfExists.then(category => {
            if (category.length > 0) {
              errors.push({ text: "Coupon title exists, choose another." });
              Promise.all([FindAllMedia(), GetAllProductCats()]).then(
                result => {
                  res.render(
                    "../../../expansion/upgrade/products/views/coupons/add_coupons",
                    {
                      title: title,
                      author: author,
                      description: description,
                      quantity: quantity,
                      media: result[0],
                      categories: result[1]
                    }
                  );
                }
              );
            } else {
              const CouponProps = {
                title: title,
                author: author,
                description: description,
                quantity: quantity,
                category: productCat
              };
              CreateCoupon(CouponProps);
              req.flash("success_msg", "Coupon Added!");
              res.redirect("/admin/products/coupons");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  }, // end of create function
  editIndex(req, res, next) {
    Promise.all([FindOneCouponsByID(req.params.id), FindAllMedia()]).then(
      result => {
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
      }
    );
  }, // end of edit index function
  edit(req, res, next) {
    /* not working */
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
    DeleteCoupon(req.params.id);
    req.flash("success_msg", "Coupon deleted!");
    res.redirect("/admin/products/coupons");
  } /* end of delete function */
};
