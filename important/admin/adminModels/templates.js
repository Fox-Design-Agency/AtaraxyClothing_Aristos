const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* Template Schema */
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
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Template", templateSchema);
