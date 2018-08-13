const Blog = require("../../blog");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").addError;

/**
 * Finds a single blog in the Blog collection.
 * @param {objectID} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the blog that matches the _id
 */
module.exports = _id => {
  return Blog.findById(_id).catch(err=>{
    errorAddEvent(err, "blog query error")
  });
};


