const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
// const Logger = require("../../../../AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Finds a single page in the Page collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the page that matches the id
 */
module.exports = stuff => {
  return MediaCategory.find(stuff);
};