const ContactMessage = require("../contactMessage");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Counts the messages in the Contact Message collection.
 * @return {promise} A promise that resolves with the contact message that was created
 */
module.exports = () => {
  return ContactMessage.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "contact message query error");
    });
};
