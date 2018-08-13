const Blog = require("../../blog");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").addError;

/**
 * Finds all blogs in the Blog collection.
 * @return {promise} A promise that resolves with all the blogs
 */
module.exports = () => {
  return Blog.find({}).catch(err=>{
    errorAddEvent(err, "blog query error")
  });
};

