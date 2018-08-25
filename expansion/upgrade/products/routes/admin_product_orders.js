const express = require("express");
const router = express.Router();
const auth = require("../../../../important/AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const ordersController = require("../controller/admin_products_orders_controller");

/*
* GET order index
*/
router.get("/", isAdmin, ordersController.index);

/*
* GET single order
*/
router.get("/single-order/:id", isAdmin, ordersController.seeOne)

/*
* GET, POST add order 
*/
router.post("/add-order",ordersController.create);

/*
* GET edit Order 
*/
router.post("/edit-order/:id",ordersController.edit);

/*
* GET Archive order
*/
router.get("/archive-order/:id", ordersController.archive)

/*
* GET delete order
*/
router.delete(
  "/delete-order/:id",
  isAdmin,
  ordersController.delete
);

module.exports = router;
