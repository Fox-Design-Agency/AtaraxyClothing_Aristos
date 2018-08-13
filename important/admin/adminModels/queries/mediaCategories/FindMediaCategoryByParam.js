const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the media categories matching stuff param in the Media Category collection.
 * @param {object} stuff - The object of the stuff to find.
 * @return {promise} A promise that resolves with all the stuff that matches the stuff param
 */
module.exports = stuff => {
  return MediaCategory.find(stuff).catch(err => {
    addErrorEvent(err, "media category query error");
  });
};