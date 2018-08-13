const ContactMessage = require("../contactMessage");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single contact message in the Contact Message collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the message that matches the id
 */
module.exports = _id => {
  return ContactMessage.findById(_id).catch(err => {
    errorAddEvent(err, "contact message query error");
  });
};

