const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* Media Schema */
const MediaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  category: {
    type: String,
  },
  description: String,
  keywords: String,
  link: String
});
module.exports = mongoose.model("Media", MediaSchema);