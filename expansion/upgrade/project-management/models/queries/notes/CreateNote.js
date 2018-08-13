const Note = require("../../note");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Creates a single note in the Note collection.
 * @param {object} noteProps - Object containing ??
 * @return {promise} A promise that resolves with the note that was created
 */
module.exports = noteProps => {
  const note = new Note(noteProps);
  return note.save().catch(err => {
    errorAddEvent(err, "notes query error");
  });
};

