const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single media category in the Media Category collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the media category that matches the id
 */
module.exports = _id => {
  return MediaCategory.findById(_id).catch(err => {
    addErrorEvent(err, "media category query error");
  });
};