const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single media category in the Media category collection
 * @param {string} _id - The ID of the media category to edit.
 * @param {object} mediaCategoryProps - An object with ??
 * @return {promise} A promise that resolves when the media category is edited
 */
module.exports = (_id, mediaCategoryProps) => {
  return MediaCategory.findByIdAndUpdate({ _id }, mediaCategoryProps).catch(
    err => {
      addErrorEvent(err, "media category query error");
    }
  );
};
