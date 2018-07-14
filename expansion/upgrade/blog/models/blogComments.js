const mongoose = require("mongoose");

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
    type: Date,
    default: Date.now
  }
}); /* end of blof comments schema */
/* start of blog comments functions */

/* end of blog comments functions */
module.exports = mongoose.model("BlogComments", BlogComments);
