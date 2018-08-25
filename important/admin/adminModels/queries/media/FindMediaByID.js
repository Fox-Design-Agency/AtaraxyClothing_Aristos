const Media = require("../../medias");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Finds a single media in the MEdia collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the media that matches the id
 */
module.exports = _id => {
  return Media.findById(_id)
    .populate("category")
    .catch(err => {
      addErrorEvent(err, "image media query error");
    });
};