const mongoose = require("mongoose");

// Product Category Schema
const ProductCategorySchema = new mongoose.Schema({
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
    type: String
  },
  imagepath: {
    type: String
  },
  sorting: {
    type: Number
  }
});

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);
