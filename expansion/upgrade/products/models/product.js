const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

// Product Schema
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "ProductCategory"
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  keywords: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  sorting: {
    type: Number
  },
  color: [
    {
      name: String,
      fileID:String
    }
  ],
  sizes: [
    {
      type: String
    }
  ],
  printfile: {
    type: String
  },
  productType: {
    type: String
  },
  status: {
    type: String,
    default: "public"
  },
  allowReviews: {
    type: Boolean,
    default: true
  },
  inventory: {
    type: Number
  }
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
