const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* Page Schema */
const PageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  parent: {
    type: String
  },
  slug: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  sorting: {
    type: Number
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
  template: {
    type: Schema.Types.ObjectId,
    ref: "Template"
  }
});

module.exports = mongoose.model("Page", PageSchema);