const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");
/*
* GET  all products
*/
router.get("/", productController.allProducts);

/*
* GET  products by category
*/
router.get("/:category", productController.productByCategory);

/*
* GET  product details
*/
router.get("/:category/:product", productController.singleProduct);

//Exports
module.exports = router;
