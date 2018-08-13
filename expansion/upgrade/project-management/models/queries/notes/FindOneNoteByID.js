const Note = require("../../note");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single note in the Note collection.
 * @param {objectID} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the note that matches the id
 */
module.exports = _id => {
  return Note.findById(_id).catch(err => {
    errorAddEvent(err, "notes query error");
  });
};

