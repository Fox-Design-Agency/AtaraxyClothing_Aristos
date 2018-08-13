const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Counts the media categories in the Media Categories collection.
 * @return {promise} A promise that resolves with the count
 */
module.exports = () => {
  return MediaCategory.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      addErrorEvent(err, "media category query error");
    });
};
