const fs = require("fs-extra");
// GET page model
const findPageWithParam = require("../../../important/admin/adminModels/queries/page/FindPageWithParam");
// GET Product model
const findAllSortedProducts = require("../../../expansion/upgrade/products/models/queries/product/FindAllSortedProducts");
const findSortedProductsWithParam = require("../../../expansion/upgrade/products/models/queries/product/FindSortedProductWithParam");
const findProductWithParam = require("../../../expansion/upgrade/products/models/queries/product/FindProductWithParam");
// GET Product Category model
const findProductCategoryWithParam = require("../../../expansion/upgrade/products/models/queries/productCategory/FindProductCategoryWithParam");

module.exports = {
  allProducts(req, res, next) {
    const productPage = findPageWithParam({ slug: "store" });
    const sortedProducts = findAllSortedProducts();
    Promise.all([productPage, sortedProducts]).then(result => {
      res.render("product/all_products", {
        title: "All products",
        products: result[1],
        description: result[0][0].description,
        author: result[0][0].author,
        keywords: result[0][0].keywords
      });
    });
  },
  productByCategory(req, res, next) {
    let categorySlug = req.params.category;

    const ProductCategories = findProductCategoryWithParam({
      slug: categorySlug
    });
    const SortedProducts = findSortedProductsWithParam({
      category: categorySlug
    });
    Promise.all([ProductCategories, SortedProducts]).then(result => {
      res.render("product/cat_products", {
        title: result[0][0].title,
        slug: result[0][0].slug,
        products: result[1],
        description: result[0][0].description,
        author: result[0][0].author,
        keywords: result[0][0].keywords
      });
    });
  },
  singleProduct(req, res, next) {
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
  }
};
