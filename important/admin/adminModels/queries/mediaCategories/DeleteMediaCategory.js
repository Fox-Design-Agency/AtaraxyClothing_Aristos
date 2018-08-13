const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single media category from the Media category collection
 * @param {string} _id - The ID of the media category to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = id => {
  return MediaCategory.findByIdAndRemove({ _id: id }).catch(err => {
    addErrorEvent(err, "media category query error");
  });
};
