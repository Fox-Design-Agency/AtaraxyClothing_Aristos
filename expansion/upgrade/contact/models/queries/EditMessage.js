const ContactMessage = require("../contactMessage");
/* Aristos Logger Path */
const Logger = require("../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Edits a single page in the Page collection
 * @param {string} _id - The ID of the page to edit.
 * @param {object} artistProps - An object with title, slug, content, parent, 100, description, keywords, author
 * @return {promise} A promise that resolves when the page is edited
 */
module.exports = (_id, messageProps) => {
  return ContactMessage.findByIdAndUpdate({ _id }, messageProps).catch(err => {
    Logger.error(err);
  });
};
