const express = require("express");
const router = express.Router();
const fs = require("fs-extra");
// GET Product model
const findAllSortedProducts = require("../../../expansion/upgrade/products/models/queries/product/FindAllSortedProducts");
const findSortedProductsWithParam = require("../../../expansion/upgrade/products/models/queries/product/FindSortedProductWithParam");
const findProductWithParam = require("../../../expansion/upgrade/products/models/queries/product/FindProductWithParam");
// GET Product Category model
const findProductCategoryWithParam = require("../../../expansion/upgrade/products/models/queries/productCategory/FindProductCategoryWithParam");

/*
* GET  all products
*/

router.get("/", function(req, res) {
  findAllSortedProducts().then(products => {
    res.render("product/all_products", {
      title: "All products",
      products: products,
      description: "",
      author: "",
      keywords: ""
    });
  });
});

/*
* GET  products by category
*/

router.get("/:category", function(req, res) {
  let categorySlug = req.params.category;

  const ProductCategories = findProductCategoryWithParam({
    slug: categorySlug
  });
  const SortedProducts = findSortedProductsWithParam({
    category: categorySlug
  });
  Promise.all([ProductCategories, SortedProducts]).then(result => {
    res.render("product/cat_products", {
      title: result[0].title,
      slug: result[0].slug,
      products: result[1],
      description: result[0].description,
      author: result[0].author,
      keywords: result[0].keywords
    });
  });
});

/*
* GET  product details
*/

router.get("/:category/:product", (req, res) => {
  let galleryImages = null;
  let loggedIn = req.isAuthenticated() ? true : false;
  findProductWithParam({ slug: req.params.product }).then(product => {
    let galleryDir =
      "content/public/images/product_images/" + product[0]._id + "/gallery";

    fs.readdir(galleryDir, function(err, files) {
      if (err) {
        console.log(err);
      } else {
        galleryImages = files;

        res.render("product/product", {
          title: product[0].title,
          product: product[0],
          galleryImages: galleryImages,
          loggedIn: loggedIn,
          author: product[0].author,
          description: product[0].description,
          keywords: product[0].keywords
        });
      }
    });
  });
});

//Exports
module.exports = router;
