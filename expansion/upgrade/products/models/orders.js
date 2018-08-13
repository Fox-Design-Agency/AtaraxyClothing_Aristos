const mongoose = require("mongoose");

// Page Schema
const OrdersSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  total: {
    type: String
  },
  shipping: {
    type: String
  },
  name: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  },
  status: {
    type: String
  },
  items: {
    type: Object
  }
});
const Order = mongoose.model("Orders", OrdersSchema);
module.exports = Order;


