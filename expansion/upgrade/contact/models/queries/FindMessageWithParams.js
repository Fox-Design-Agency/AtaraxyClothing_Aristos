const ContactMessage = require("../contactMessage");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all th emessage that match the params in the Contact Message collection.
 * @param {object} stuff - The ID of the record to find.
 * @return {promise} A promise that resolves with the messages that matches the stuff param
 */
module.exports = stuff => {
  return ContactMessage.find(stuff).catch(err => {
    errorAddEvent(err, "contact message query error");
  });
};

