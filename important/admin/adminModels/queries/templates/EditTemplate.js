const Template = require("../../templates");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger").addError;

/**
 * Edits a single page in the Page collection
 * @param {string} _id - The ID of the page to edit.
 * @param {object} artistProps - An object with title, slug, content, parent, 100, description, keywords, author
 * @return {promise} A promise that resolves when the page is edited
 */
module.exports = (_id, templateProps) => {
  return Template.findByIdAndUpdate({ _id }, templateProps).catch(err => {
    addErrorEvent(err, "template query error")
  });
};
