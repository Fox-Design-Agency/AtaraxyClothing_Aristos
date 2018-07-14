const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* Blog Schema */
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  published: {
    type: Date,
    default: Date.now
  },
  content: {
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
  allowComments: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    default: "public"
  },
  sorting: {
    type: Number
  }
}); /* end of blog schema */
/* Start of blog schema functions */

/* end of blog schema functions */
module.exports = mongoose.model("Blog", BlogSchema);
