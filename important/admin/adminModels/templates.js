const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* Page Schema */
const templateSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  description: {
    type: String
  },
  author: {
    type: String
  }
});

module.exports = mongoose.model("Template", templateSchema);
