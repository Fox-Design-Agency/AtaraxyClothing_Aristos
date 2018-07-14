const BlogCategory = require("../../blogCategory");
/* Aristos Logger Path */
const Logger = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;
/**
 * Finds a single blog category in the Blog Category collection.
 * @param {object}  - Object containing <change this>
 * @return {promise} A promise that resolves with the Page that was created
 */
module.exports = () => {
  return BlogCategory.count({}).then(c => {
      return c
    })
};