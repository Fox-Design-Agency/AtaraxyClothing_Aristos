const express = require("express");

const router = express.Router();
const cartController = require("../controllers/cart_controller");
const orderController = require("../controllers/orders_controller");





/*
* GET, POST  add product to cart
*/
router
  .route("/add/:product")
  .get(cartController.getAddToCart)
  .post(cartController.postAddToCart);

/*
* GET  checkout product
*/
router.get("/checkout", cartController.checkout);

/*
* GET update product
*/
router.get("/update/:product", cartController.updateProduct);

/*
* GET  clear cart
*/
router.get("/clear", cartController.clearCart);

/*
* POST pay
*/
router.get("/pay/:orderid", orderController.postPay);

/*
* Paypal redirect from payment confirmation
*/
router.get("/success/:order", orderController.paypallSuccess);
/*
* GET paypal cancel
*/
router.get("/cancel", orderController.paypallCancel);

/*
* POST shipping information
*/
router.post("/shipping-information", orderController.shippingInformation);

//Exports
module.exports = router;
