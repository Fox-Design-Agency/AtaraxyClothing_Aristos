const Blog = require("../../blog");
/* Aristos Logger Path */
// const Logger = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Finds a single blog in the Blog collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the page that matches the id
 */
module.exports = _id => {
  return Blog.findById(_id);
};
