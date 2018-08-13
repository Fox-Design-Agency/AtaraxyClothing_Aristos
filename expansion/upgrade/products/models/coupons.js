const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    name: String,
    discount: Number
})

module.exports = mongoose.model("Coupon", CouponSchema)

