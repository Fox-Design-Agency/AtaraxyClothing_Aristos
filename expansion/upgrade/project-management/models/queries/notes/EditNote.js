const Note = require("../../note");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single note in the Note collection
 * @param {string} _id - The ID of the note to edit.
 * @param {object} noteProps - An object with ??
 * @return {promise} A promise that resolves when the note is edited
 */
module.exports = (_id, noteProps) => {
  return Note.findByIdAndUpdate({ _id }, noteProps).catch(err => {
    errorAddEvent(err, "notes query error");
  });
};

