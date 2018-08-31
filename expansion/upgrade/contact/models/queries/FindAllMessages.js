const fs = require("fs-extra");
const ContactMessages = fs.readJSONSync(
  "./expansion/upgrade/contact/routes/checkers/contactModelRoutes.json"
).route;
const ContactMessage = require(ContactMessages);
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