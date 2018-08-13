const Page = require("../../page");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Counts the pages in the Pages collection.
 * @return {promise} A promise that resolves with the count
 */
module.exports = () => {
  return Page.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      addErrorEvent(err, "page query error");
    });
};
