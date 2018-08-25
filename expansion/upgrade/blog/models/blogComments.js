const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
/* Blog Comments Schema */
const BlogComments = new Schema({
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
