const ContactMessage = require("../contactMessage");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Creetes a single message in the Contact Message collection.
 * @param {object} messageProps - Object containing ??
 * @return {promise} A promise that resolves with the Contact Message that was created
 */
module.exports = messageProps => {
  const contactMessage = new ContactMessage(messageProps);
  return contactMessage.save().catch(err => {
    errorAddEvent(err, "contact message query error");
  });
};

