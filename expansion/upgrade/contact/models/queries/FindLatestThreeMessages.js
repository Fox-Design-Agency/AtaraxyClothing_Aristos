const fs = require("fs-extra");
const ContactMessages = fs.readJSONSync(
  "./expansion/upgrade/contact/routes/checkers/contactModelRoutes.json"
).route;
const ContactMessage = require(ContactMessages);
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds the latest three messages in the  Contact Message collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the latest three messages
 */
module.exports = _id => {
  return ContactMessage.find({ completed: 0 })
    .sort({ _id: 1 })
    .limit(3)
    .catch(err => {
      errorAddEvent(err, "contact message query error");
    });
};