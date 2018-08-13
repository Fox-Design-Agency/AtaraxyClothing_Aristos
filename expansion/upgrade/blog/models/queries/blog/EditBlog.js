const Blog = require("../../blog");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").addError;

/**
 * Edits a single blog in the Blog collection
 * @param {objectID} _id - The ID of the blog to edit.
 * @param {object} blogProps - An object with title, slug, content, category, description, keywords, author, allowComments
 * @return {promise} A promise that resolves when the blog is edited
 */
module.exports = (_id, blogProps) => {
  return Blog.findByIdAndUpdate( _id, blogProps).catch(err => {
    errorAddEvent(err, "blog query error")
  });
};

