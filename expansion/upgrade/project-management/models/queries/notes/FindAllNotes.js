const Note = require("../../note");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the ntoes in the Note collection.
 * @return {promise} A promise that resolves with the all the notes
 */
module.exports = () => {
  return Note.find({}).catch(err => {
    errorAddEvent(err, "notes query error");
  });
};

