const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the media categories in the Media Category collection.
 * @return {promise} A promise that resolves with the media categories
 */
module.exports = () => {
  return MediaCategory.find({}).catch(err => {
    addErrorEvent(err, "media category query error");
  });
};
