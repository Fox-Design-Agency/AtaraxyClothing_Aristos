const Page = require("../../page");
/* Aristos Logger Path */
const Logger = require("../../../../AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Deletes a single page from the Page collection
 * @param {string} _id - The ID of the page to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return Page.findByIdAndRemove(_id).catch(err => Logger.error(err));
};