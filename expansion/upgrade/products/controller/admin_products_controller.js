const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
const fs = require("fs-extra");
const resizeImg = require("resize-img");

/* Product model Queries */
const CountProducts = require("../models/queries/product/CountProducts");
const CreateProduct = require("../models/queries/product/CreateProduct");
const DeleteProduct = require("../models/queries/product/DeleteProduct");
const EditProduct = require("../models/queries/product/EditProduct");
const FindAllProducts = require("../models/queries/product/FindAllProducts");
const FindOneProductByID = require("../models/queries/product/FindOneProductByID");
const FindProductWithParams = require("../models/queries/product/FindProductWithParam");
const FindAllSortedProducts = require("../models/queries/product/FindAllSortedProducts");
const FindSortedByParam = require("../models/queries/product/FindSortedByParam");
const sortProducts = require("../models/queries/product/SortProductByID");
/* Product Category model Queries */
const FindAllProductCategories = require("../models/queries/productCategory/FindAllProductCategories");

/* media queries */
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");
/* media categories Queries */
// const FindAllMediaCategories = require("../../../../important/adminModels/queries/mediaCategories/FindAllMediaCategories");

/* User Model Queries */
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");

module.exports = {
  index(req, res, next) {
    Promise.all([
      CountProducts(),
      FindAllSortedProducts(),
      FindAllProductCategories()
    ]).then(result => {
      res.render("../../../expansion/upgrade/products/views/products", {
        products: result[1],
        categories: result[2],
        count: result[0]
      });
    });
  } /* end of index function */,

  catIndex(req, res, next) {
    Promise.all([
      CountProducts(),
      FindSortedByParam({ category: req.params.category }),
      FindAllProductCategories()
    ]).then(result => {
      res.render("../../../expansion/upgrade/products/views/products", {
        products: result[1],
        categories: result[2],
        count: result[0]
      });
    });
  } /* end of cat index function */,

  addIndex(req, res, next) {
    const addProduct = fs.readJSONSync(
      "./expansion/upgrade/products/routes/checkers/productRoutes.json"
    ).addView;
    let title,
      content,
      price,
      keywords,
      description,
      inventory,
      sku = "";

    Promise.all([FindAllProductCategories(), FindAllMedia()]).then(result => {
      res.render("../../../expansion/upgrade/products/views/add_product", {
        title: title,
        content: content,
        categories: result[0],
        price: price,
        media: result[1],
        description: description,
        keywords: keywords,
        inventory: inventory,
        sku: sku,
        pluginView: addProduct
      });
    });
  } /* end of add index function */,
  create(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let imageFile =
          typeof req.files.image !== "undefined" ? req.files.image.name : "";
        let errors = [];
        if (!req.body.title) {
          errors.push({ title: "Title must have a value." });
        }
        if (!req.body.content) {
          errors.push({ title: "Content must have a value." });
        }
        if (!req.body.price) {
          errors.push({ title: "Price must have a value." });
        }

        let title = req.body.title;
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let content = req.body.content;
        let price = req.body.price;
        let category = req.body.category;
        let keywords = req.body.keywords;
        let description = req.body.description;
        let author = req.session.passport.user;
        let inventory;
        if (!req.body.inventory) {
          inventory = "-1";
        } else {
          inventory = req.body.inventory;
        }
        let sku = req.body.sku;
        let allowReviews;
        if (req.body.allowReviews === "on") {
          allowReviews = true;
        } else {
          allowReviews = false;
        }
        if (errors.length > 0) {
          Promise.all([FindAllProductCategories(), FindAllMedia()]).then(
            result => {
              res.render(
                "../../../expansion/upgrade/products/views/add_product",
                {
                  errors: errors,
                  title: title,
                  content: content,
                  categories: result[0],
                  price: price,
                  media: result[1],
                  description: description,
                  keywords: keywords,
                  inventory: inventory,
                  sku: sku
                }
              );
            }
          );
        } else {
          FindProductWithParams({ slug: slug }).then(product => {
            if (product.length > 0) {
              errors.push({ text: "Product title exists, choose another." });
              Promise.all([FindAllProductCategories(), FindAllMedia()]).then(
                result => {
                  res.render(
                    "../../../expansion/upgrade/products/views/add_product",
                    {
                      title: title,
                      content: content,
                      categories: result[0],
                      price: price,
                      media: result[1],
                      description: description,
                      keywords: keywords,
                      inventory: inventory,
                      sku: sku
                    }
                  );
                }
              );
            } else {
              let price2 = parseFloat(price).toFixed(2);
              const productProps = {
                title: title,
                slug: slug,
                content: content,
                price: price2,
                category: category,
                image: imageFile,
                description: description,
                keywords: keywords,
                sorting: 100,
                author: author,
                inventory: inventory,
                sku: sku,
                allowReviews: allowReviews
              };
              CreateProduct(productProps).then(product => {
                fs.ensureDirSync(
                  "content/public/images/product_images/" + product._id,
                  err => {
                    if (err) {
                      errorAddEvent(err);
                    }
                  }
                );
                fs.ensureDirSync(
                  "content/public/images/product_images/" +
                    product._id +
                    "/gallery",
                  err => {
                    if (err) {
                      errorAddEvent(err);
                    }
                  }
                );
                fs.ensureDirSync(
                  "content/public/images/product_images/" +
                    product._id +
                    "/gallery/thumbs",
                  err => {
                    if (err) {
                      errorAddEvent(err);
                    }
                  }
                );

                if (imageFile !== "") {
                  let productImage = req.files.image;
                  let path =
                    "content/public/images/product_images/" +
                    product._id +
                    "/" +
                    imageFile;

                  productImage.mv(path, function(err) {
                    if (err) {
                      errorAddEvent(err);
                    }
                  });
                }
              });
            }
            req.flash("success_msg", "Product added!");
            res.redirect("/admin/products");
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,
  editIndex(req, res, next) {
    const editProduct = fs.readJSONSync(
      "./expansion/upgrade/products/routes/checkers/productRoutes.json"
    ).editView;
    Promise.all([
      FindAllProductCategories(),
      FindOneProductByID(req.params.id),
      FindAllMedia()
    ]).then(result => {
      let galleryDir =
        "content/public/images/product_images/" + result[1]._id + "/gallery";
      let galleryImages = null;
      fs.readdir(galleryDir, (err, files) => {
        if (err) {
          Logger.error(err);
        } else {
          galleryImages = files;
          res.render("../../../expansion/upgrade/products/views/edit_product", {
            title: result[1].title,
            content: result[1].content,
            categories: result[0],
            selectedCat: result[1].category,
            price: parseFloat(result[1].price).toFixed(2),
            image: result[1].image,
            galleryImages: galleryImages,
            id: result[1]._id,
            media: result[2],
            description: result[1].description,
            keywords: result[1].keywords,
            sku: result[1].printfile,
            inventory: result[1].inventory,
            allowReviews: result[1].allowReviews,
            pluginView: editProduct
          });
        }
      });
    });
  } /* end of edit index function */,
  edit(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let imageFile =
          typeof req.files.image !== "undefined" ? req.files.image.name : "";
        let errors = [];
        if (!req.body.title) {
          errors.push({ title: "Title must have a value." });
        }
        if (!req.body.content) {
          errors.push({ title: "Content must have a value." });
        }
        if (!req.body.price) {
          errors.push({ title: "Price must have a value." });
        }

        let title = req.body.title;
        let slug = title.replace(/\s+/g, "-").toLowerCase();
        let content = req.body.content;
        let price = req.body.price;
        let category = req.body.category;
        let pimage = req.body.pimage;
        let id = req.params.id;
        let description = req.body.description;
        let keywords = req.body.keywords;

        let inventory;
        if (!req.body.inventory) {
          inventory = "-1";
        } else {
          inventory = req.body.inventory;
        }
        let sku = req.body.sku;
        let allowReviews;
        if (req.body.allowReviews === "on") {
          allowReviews = true;
        } else {
          allowReviews = false;
        }

        if (errors.length > 0) {
          req.flash("error_msg", "errors are present");
          res.redirect("/admin/products/edit-products/" + id);
        } else {
          FindProductWithParams({
            slug: slug,
            _id: { $ne: id }
          }).then(product => {
            if (product.length > 0) {
              req.flash("danger", "Product title exists, choose another.");
              res.redirect("/admin/products/edit-product" + id);
            } else {
              if (imageFile !== "") {
                pimage = imageFile;
              }
              const productProps = {
                title: title,
                slug: slug,
                content: content,
                price: parseFloat(price).toFixed(2),
                category: category,
                image: pimage,
                description: description,
                keywords: keywords,
                inventory: inventory,
                sku: sku,
                allowReviews: allowReviews
              };
              EditProduct(id, productProps);

              if (imageFile !== "") {
                if (pimage !== "") {
                  fs.remove(
                    "content/public/images/product_images/" + id + "/" + pimage,
                    function(err) {
                      if (err) {
                        errorAddEvent(err);
                      }
                    }
                  );
                }

                let productImage = req.files.image;
                let path =
                  "content/public/images/product_images/" +
                  id +
                  "/" +
                  imageFile;

                productImage.mv(path, function(err) {
                  if (err) {
                    errorAddEvent(err);
                  }
                });
              }

              req.flash("success_msg", "Product edited!");
              res.redirect("/admin/products");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of edit function */,
  createGallery(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let productImage = req.files.file;
        let id = req.params.id;
        let path =
          "content/public/images/product_images/" +
          id +
          "/gallery/" +
          req.files.file.name;
        let thumbsPath =
          "content/public/images/product_images/" +
          id +
          "/gallery/thumbs/" +
          req.files.file.name;

        productImage.mv(path, err => {
          if (err) {
            errorAddEvent(err);
          }
          resizeImg(fs.readFileSync(path), { width: 100, height: 100 }).then(
            function(buf) {
              fs.writeFileSync(thumbsPath, buf);
            }
          );
        });
        res.sendStatus(200);
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create gallery function */,
  deleteImage(req, res, next) {
    let originalImage =
      "content/public/images/product_images/" +
      req.query.id +
      "/gallery/" +
      req.params.image;
    let thumbsImage =
      "content/public/images/product_images/" +
      req.query.id +
      "/gallery/thumbs/" +
      req.params.image;

    fs.remove(originalImage, err => {
      if (err) {
        errorAddEvent(err);
      } else {
        fs.remove(thumbsImage, err => {
          if (err) {
            errorAddEvent(err);
          } else {
            req.flash("success_msg", "Image deleted!");
            res.redirect(
              "/admin/products/edit-product/" + req.query.id + "#gallery"
            );
          }
        });
      }
    });
  } /* end of delete image function */,

  deleteProduct(req, res, next) {
    let id = req.params.id;
    let path = "content/public/images/product_images/" + id;
    fs.remove(path, err => {
      if (err) {
        errorAddEvent(err);
      } else {
        DeleteProduct(id);

        req.flash("success_msg", "Product deleted!");
        res.redirect("/admin/products");
      }
    });
  } /* end of delete product function */,

  reorder(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let ids = req.body["id[]"];
        sortProducts(ids);
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of reorder function */
};