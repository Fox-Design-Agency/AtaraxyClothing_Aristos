const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
const fs = require("fs-extra");
const resizeImg = require("resize-img");

// Product model Queries
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
// Product Category model Queries
const FindAllProductCategories = require("../models/queries/productCategory/FindAllProductCategories");

//media queries
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");
// media categories Queries
// const FindAllMediaCategories = require("../../../../important/adminModels/queries/mediaCategories/FindAllMediaCategories");

//User Model Queries
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");

module.exports = {
  index(req, res, next) {
    const Count = CountProducts();
    const SortedProducts = FindAllSortedProducts();
    const AllProductCategories = FindAllProductCategories();
    Promise.all([Count, SortedProducts, AllProductCategories]).then(result => {
      res.render("../../../expansion/upgrade/products/views/products", {
        products: result[1],
        categories: result[2],
        count: result[0]
      });
    });
  }, // end of index function

  catIndex(req, res, next) {
    const Count = CountProducts();
    const SortedProducts = FindSortedByParam({ category: req.params.category });
    const AllProductCategories = FindAllProductCategories();
    Promise.all([Count, SortedProducts, AllProductCategories]).then(result => {
      res.render("../../../expansion/upgrade/products/views/products", {
        products: result[1],
        categories: result[2],
        count: result[0]
      });
    });
  }, // end of cat index function

  addIndex(req, res, next) {
    let title,
      content,
      price,
      keywords,
      description,
      author = "";
    /* start of printful plug in code */
    /* move to its own file?? , or integrate plugin potential */
    if (req.app.locals.printfulPluginExists) {
      let printfile = "";

      const AllProductCategories = FindAllProductCategories();
      const AllMedia = FindAllMedia();
      Promise.all([AllProductCategories, AllMedia]).then(result => {
        res.render("../../../expansion/upgrade/products/views/add_product", {
          title: title,
          content: content,
          categories: result[0],
          price: price,
          media: result[1],
          description: description,
          keywords: keywords,
          author: author,
          printfile: printfile
        });
      });
      /* end of printful plug in code */
    } else {
      const AllProductCategories = FindAllProductCategories();
      const AllMedia = FindAllMedia();
      Promise.all([AllProductCategories, AllMedia]).then(result => {
        res.render("../../../expansion/upgrade/products/views/add_product", {
          title: title,
          content: content,
          categories: result[0],
          price: price,
          media: result[1],
          description: description,
          keywords: keywords,
          author: author
        });
      });
    }
  }, // end of add index function
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
        if (!imageFile) {
          errors.push({ title: "You must upload an image." });
        }

        let title = req.body.title;
        let slug = title.replace(/s+/g, "-").toLowerCase();
        let content = req.body.content;
        let price = req.body.price;
        let category = req.body.category;
        let keywords = req.body.keywords;
        let description = req.body.description;
        let author = req.body.author;

        //Start of Printful Code
        // move to own file, or integrate plugin potential
        if (req.app.locals.printfulPluginExists) {
          let sizes = req.body.sizes;
          let color = req.body.color;
          let printfile = req.body.printfile;
          let productType = req.body.productType;
          if (errors.length > 0) {
            const AllProductCategories = FindAllProductCategories();
            const AllMedia = FindAllMedia();
            Promise.all([AllProductCategories, AllMedia]).then(result => {
              res.render("../../upgrade/products/views/add_product", {
                errors: errors,
                title: title,
                content: content,
                categories: result[0],
                price: price,
                media: result[1],
                description: description,
                keywords: keywords,
                author: author,
                printfile: printfile
              });
            });
          } else {
            const CheckIfExists = FindProductWithParams({ slug: slug });
            CheckIfExists.then(product => {
              if (product.length > 0) {
                errors.push({ text: "Product title exists, chooser another." });
                const AllProductCategories = FindAllProductCategories();
                const AllMedia = FindAllMedia();
                Promise.all([AllProductCategories, AllMedia]).then(result => {
                  res.render("../../upgrade/products/views/add_product", {
                    errors: errors,
                    title: title,
                    content: content,
                    categories: result[0],
                    price: price,
                    media: result[1],
                    description: description,
                    keywords: keywords,
                    author: author,
                    printfile: printfile
                  });
                });
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
                  printfile: printfile,
                  productType: productType,
                  color: color,
                  sizes: sizes
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
          //End of Printful Code
        } else {
          if (errors.length > 0) {
            const AllProductCategories = FindAllProductCategories();
            const AllMedia = FindAllMedia();
            Promise.all([AllProductCategories, AllMedia]).then(result => {
              res.render("../../upgrade/products/views/add_product", {
                errors: errors,
                title: title,
                content: content,
                categories: result[0],
                price: price,
                media: result[1],
                description: description,
                keywords: keywords,
                author: author
              });
            });
          } else {
            const CheckIfExists = FindProductWithParams({ slug: slug });
            CheckIfExists.then(product => {
              if (product.length > 0) {
                errors.push({ text: "Product title exists, chooser another." });
                const AllProductCategories = FindAllProductCategories();
                const AllMedia = FindAllMedia();
                Promise.all([AllProductCategories, AllMedia]).then(result => {
                  res.render("../../upgrade/products/views/add_product", {
                    title: title,
                    content: content,
                    categories: result[0],
                    price: price,
                    media: result[1],
                    description: description,
                    keywords: keywords,
                    author: author
                  });
                });
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
                  author: author
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
        }
      } else {
        res.redirect("/users/login");
      }
    });
  }, // end of create function
  editIndex(req, res, next) {
    const AllProductCategories = FindAllProductCategories();
    const AllMedia = FindAllMedia();
    const FoundProduct = FindOneProductByID(req.params.id);
    Promise.all([AllProductCategories, FoundProduct, AllMedia]).then(result => {
      let galleryDir =
        "content/public/images/product_images/" + result[1]._id + "/gallery";
      let galleryImages = null;

      fs.readdir(galleryDir, function(err, files) {
        if (err) {
          Logger.error(err);
        } else {
          galleryImages = files;

          //printful specific code
          if (req.app.locals.printfulPluginExists) {
            res.render(
              "../../../expansion/upgrade/products/views/edit_product",
              {
                title: result[1].title,
                content: result[1].content,
                categories: result[0],
                selectedCat: result[1].category,
                price: parseFloat(result[1].price).toFixed(2),
                image: result[1].image,
                galleryImages: galleryImages,
                id: result[1]._id,
                media: result[2],
                author: result[1].author,
                description: result[1].description,
                keywords: result[1].keywords,
                sizes: result[1].sizes,
                color: result[1].color,
                printfile: result[1].printfile
              }
            );
          } else {
            res.render("../../upgrade/products/views/edit_product", {
              title: result[1].title,
              errors: errors,
              content: result[1].content,
              categories: result[0],
              selectedCat: result[1].category,
              price: parseFloat(result[1].price).toFixed(2),
              image: result[1].image,
              galleryImages: galleryImages,
              id: result[1]._id,
              media: result[2],
              author: result[1].author,
              description: result[1].description,
              keywords: result[1].keywords
            });
          }
        }
      });
    });
  }, // end of edit index function
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
        let slug = title.replace(/s+/g, "-").toLowerCase();
        let content = req.body.content;
        let price = req.body.price;
        let category = req.body.category;
        let pimage = req.body.pimage;
        let id = req.params.id;
        let description = req.body.description;
        let author = req.body.author;
        let keywords = req.body.keywords;

        if (errors.length > 0) {
          req.flash("error_msg", "errors are present");
          res.redirect("/admin/products/edit-products/" + id);
        } else {
          const CheckIfExists = FindProductWithParams({
            slug: slug,
            _id: { $ne: id }
          });
          CheckIfExists.then(product => {
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
                author: author
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
  }, // end of edit function
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
  }, // end fo create gallery function
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
            res.redirect("/admin/products/edit-product/" + req.query.id);
          }
        });
      }
    });
  }, // end of delete image function

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
  }, // end of delete product function

  reorder(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let ids = req.body["id[]"];
        sortProducts(ids)
        
      } else {
        res.redirect("/users/login");
      }
    });
  }
};


