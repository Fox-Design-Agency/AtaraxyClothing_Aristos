const Blog = require("../../blog");
/* Aristos Logger Path */
const Logger = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;
/**
 * Finds a single blog in the Blog collection.
 * @param {object} blogProps - Object containing <change this>
 * @return {promise} A promise that resolves with the Blog that was created
 */
module.exports = () => {
  return Blog.count({}).then(c => {
      return c
    })
};