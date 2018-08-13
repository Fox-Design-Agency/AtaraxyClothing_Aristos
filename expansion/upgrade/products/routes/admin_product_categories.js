const express = require("express");
const router = express.Router();
const auth = require("../../../../important/AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const productsCategoriesController = require("../controller/admin_products_categories_controller");

/*
* GET product category index
*/
router.get("/", isAdmin, productsCategoriesController.index);
/*
* GET, POST add product category
*/
router
  .route("/add-product-category")
  .get(isAdmin, productsCategoriesController.addIndex)
  .post(productsCategoriesController.create);

/*
* GET edit product category
*/
router
  .route("/edit-product-category/:id")
  .get(isAdmin, productsCategoriesController.editIndex)
  .post(productsCategoriesController.edit);

/*
* GET delete product category
*/
router.delete(
  "/delete-product-category/:id",
  isAdmin,
  productsCategoriesController.delete
);
/* 
* POST reorder product categories
*/
router.post(
  "/reorder-product-categories",
  productsCategoriesController.reorder
);
//Exports
module.exports = router;

