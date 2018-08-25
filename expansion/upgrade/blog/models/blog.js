const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
/* Blog Schema */
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "BlogCategory"
  },
  published: {
    type: String,
    default: moment().format("dddd, MMM Do YYYY")
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
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  allowComments: {
    type: Boolean
  },
  comments:{
    type: Schema.Types.ObjectId,
    ref: "BlogComments"
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