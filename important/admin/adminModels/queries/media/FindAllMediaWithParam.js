const Media = require("../../medias");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Finds all the media match params in the Media collection.
 * @param {object} stuffs - The object of the stuff to find.
 * @return {promise} A promise that resolves with the media that matches the stuff param
 */
module.exports = stuffs => {
  return Media.find(stuffs).catch(err => {
    addErrorEvent(err, "image media query error");
  });
};