const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/*  order model Queries */
const CountOrders = require("../models/queries/orders/CountOrders");
const GetAllOrders = require("../models/queries/orders/FindAllOrders");
const GetOneOrderByID = require("../models/queries/orders/FindOneOrderByID");
const DeleteOrder = require("../models/queries/orders/DeleteOrder");
/* media queries */
const FindAllMedia = require("../../../../important/admin/adminModels/queries/media/FindAllMedia");
/* User Model Queries */
const FindOneUserByID = require("../../../../important/admin/adminModels/queries/user/FindOneUserWithID");
module.exports = {
  index(req, res, next) {
    Promise.all([CountOrders(), GetAllOrders()]).then(result => {
      res.render(
        "../../../expansion/upgrade/products/views/orders/active_orders",
        {
          orders: result[1],
          count: result[0]
        }
      );
    });
  } /* end of index function */,
  seeOne(req, res, next) {
    GetOneOrderByID(req.params.id).then(order => {
      res.render(
        "../../../expansion/upgrade/products/views/orders/view_order",
        {
          order: order
        }
      );
    });
  } /* end of see one function */,
  create(req, res, next) {
    // not a thing right now
    req.flash("error_msg", "Not a thing just yet!");
  } /* end of create function */,
  edit(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      //should check the user to the order user and then do stuff
    });
  } /* end of edit function */,
  archive() {
    //stuff to archive, basically edit
  } /* end of archive function */,
  delete(req, res, next) {
    // should also check user against order
    DeleteOrder(req.params.id);
    req.flash("success_msg", "Order deleted!");
    res.redirect("back");
  } /* end of delete function */
};
