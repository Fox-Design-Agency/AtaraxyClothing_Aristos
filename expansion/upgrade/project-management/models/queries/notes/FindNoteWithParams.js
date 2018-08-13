const Note = require("../../note");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the notes by param in the Note collection.
 * @param {object} stuff - The object of the stuff to find.
 * @return {promise} A promise that resolves with the note(s) that matches the stuff
 */
module.exports = stuff => {
  return Note.find(stuff).catch(err => {
    errorAddEvent(err, "notes query error");
  });
};

