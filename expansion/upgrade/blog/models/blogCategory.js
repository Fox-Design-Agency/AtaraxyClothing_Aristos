const mongoose = require("mongoose");

/* Blog Category Schema */
const BlogCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author:{
    type: String
  },
  description:{
    type: String
  },
  keywords:{
    type: String
  },
  slug: {
    type: String
  },
  sorting: {
    type: Number
  }
}); /* end of blog category schema */
/* start of blog category schema function */

/* end of blog category schema functions */
module.exports = mongoose.model("BlogCategory", BlogCategorySchema);

