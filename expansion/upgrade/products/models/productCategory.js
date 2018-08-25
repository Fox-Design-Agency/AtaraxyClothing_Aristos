const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product Category Schema
const ProductCategorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
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
  imagepath: {
    type: String
  },
  sorting: {
    type: Number
  }
});

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
