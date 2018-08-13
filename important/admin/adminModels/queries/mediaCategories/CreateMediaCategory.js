const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Creates a single media category in the Media Category collection.
 * @param {object} mediaCategoryProps - Object containing <change this>
 * @return {promise} A promise that resolves with the media category that was created
 */
module.exports = mediaCategoryProps => {
  const mediaCategory = new MediaCategory(mediaCategoryProps);
  return mediaCategory.save().catch(err => {
    addErrorEvent(err, "media category query error");
  });
};
