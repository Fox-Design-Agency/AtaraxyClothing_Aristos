const Page = require("../../page");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single page in the Page collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the page that matches the id
 */
module.exports = stuff => {
  return Page.find(stuff).catch(err => {
    addErrorEvent(err, "page query error");
  });
};
