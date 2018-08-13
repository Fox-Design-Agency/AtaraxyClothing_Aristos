const mongoose = require("mongoose");
const moment = require("moment");
/* Blog Comments Schema */
const BlogComments = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  blogref: {
    type: Schema.Types.ObjectId,
    ref: "Blog"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  created: {
    type: String,
    default: moment().format("dddd, MMM Do YYYY")
  }
}); /* end of blof comments schema */
/* start of blog comments functions */

/* end of blog comments functions */
module.exports = mongoose.model("BlogComments", BlogComments);

