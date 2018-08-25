const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
// Page Schema
const OrdersSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  orderPlace:{
    type: String,
    default: moment().format("dddd, MMM Do YYYY")
  },
  total: {
    type: Number
  },
  shipping: {
    type: Number
  },
  tax:{
    type: Number
  },
  name: {
    type: String
  },
  streetAddress: {
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