const Blog = require("../../blog");
/* Aristos Logger Path */
// const Logger = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Finds all blogs in the Blog collection sorted by their sorting value.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the page that matches the id
 */
module.exports = () => {
  return Blog.find({}).sort({ sorting: 1 });
};
