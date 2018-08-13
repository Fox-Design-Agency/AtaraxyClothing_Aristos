const Media = require("../../medias");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Creates a single media in the Media collection.
 * @param {object} mediaProps - Object containing <change this>
 * @return {promise} A promise that resolves with the media that was created
 */
module.exports = mediaProps => {
  const media = new Media(mediaProps);
  return media.save().catch(err => {
    addErrorEvent(err, "image media query error");
  });
};
