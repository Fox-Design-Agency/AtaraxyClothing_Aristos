const fs = require("fs-extra");
const ContactMessages = fs.readJSONSync(
  "./expansion/upgrade/contact/routes/checkers/contactModelRoutes.json"
).route;
const ContactMessage = require(ContactMessages);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single contact message in the Contact Message collection
 * @param {string} _id - The ID of the message to edit.
 * @param {object} messageProps - An object with ??
 * @return {promise} A promise that resolves when the contact message is edited
 */
module.exports = (_id, messageProps) => {
  return ContactMessage.findByIdAndUpdate({ _id }, messageProps).catch(err => {
    errorAddEvent(err, "contact message query error");
  });
};