const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
  title: {
    type: String 
  },
  description: {
    type: String
  },
  discount: Number,
  category: {
    type: Schema.Types.ObjectId,
    ref: "ProductCategory"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  quantity:{
    type: Number
  },
  start:{
    type: String,
    default: moment().format("dddd, MMM Do YYYY")
  },
  end:{
    type: String
  }
});

module.exports = mongoose.model("Coupon", CouponSchema);