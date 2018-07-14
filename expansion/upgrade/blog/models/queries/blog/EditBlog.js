const Blog = require("../../blog");
/* Aristos Logger Path */
const Logger = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Edits a single blog in the Blog collection
 * @param {string} _id - The ID of the blog to edit.
 * @param {object} blogProps - An object with title, slug, content, parent, 100, description, keywords, author
 * @return {promise} A promise that resolves when the blog is edited
 */
module.exports = (_id, blogProps) => {
  return Blog.findByIdAndUpdate({ _id }, blogProps).catch(err => {
    Logger.error(err);
  });
};
