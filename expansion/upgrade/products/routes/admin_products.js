const express = require("express");
const router = express.Router();
const auth = require("../../../../important/AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const productsController = require("../controller/admin_products_controller");

/*
* GET Product index
*/
router.get("/", isAdmin, productsController.index);
/*
* GET Product index
*/
router.get("/categories/:category", isAdmin, productsController.catIndex);

/*
* GET, POST add Product
*/
router
  .route("/add-product")
  .get(isAdmin, productsController.addIndex)
  .post(productsController.create);
/*
* GET, POST edit Product
*/
router
  .route("/edit-product/:id")
  .get(isAdmin, productsController.editIndex)
  .post(productsController.edit);

/*
* POST product gallery
*/
router.post("/product-gallery/:id", productsController.createGallery);

/*
* GET delete image
*/
router.delete("/delete-image/:image", isAdmin, productsController.deleteImage);

/*
* GET delete Product
*/
router.delete("/delete-product/:id", isAdmin, productsController.deleteProduct);

/* 
* POST reorder products
*/
router.post("/reorder-products", productsController.reorder);

//Exports
module.exports = router;
