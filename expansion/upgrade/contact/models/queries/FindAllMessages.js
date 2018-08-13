const ContactMessage = require("../contactMessage");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the messages in the Contact Message collection.
 * @return {promise} A promise that resolves with all the messages
 */
module.exports = () => {
  return ContactMessage.find({}).catch(err => {
    errorAddEvent(err, "contact message query error");
  });
};

