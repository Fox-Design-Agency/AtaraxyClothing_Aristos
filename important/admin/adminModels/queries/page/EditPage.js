const Page = require("../../page");
/* Aristos Logger Path */
const Logger = require("../../../../AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Edits a single page in the Page collection
 * @param {string} _id - The ID of the page to edit.
 * @param {object} artistProps - An object with title, slug, content, parent, 100, description, keywords, author
 * @return {promise} A promise that resolves when the page is edited
 */
module.exports = (_id, pageProps) => {
  return Page.findByIdAndUpdate({ _id }, pageProps).catch(err => {
    Logger.error(err);
  });
};
