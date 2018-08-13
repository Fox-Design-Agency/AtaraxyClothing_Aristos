const Note = require("../../note");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single note from the Note collection
 * @param {string} _id - The ID of the note to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return Note.findByIdAndRemove(_id).catch(err => {
    errorAddEvent(err, "notes query error");
  });
};
