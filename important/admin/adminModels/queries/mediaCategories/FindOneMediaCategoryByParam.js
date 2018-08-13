const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single media category by param in the Media Category collection.
 * @param {object} stuff - The object of the stuff to find.
 * @return {promise} A promise that resolves with a single media category matching the param
 */
module.exports = stuff => {
  return MediaCategory.findOne(stuff).catch(err => {
    addErrorEvent(err, "media category query error");
  });
};
