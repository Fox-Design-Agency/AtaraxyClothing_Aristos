const Template = require("../../templates");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single template in the Template collection
 * @param {string} _id - The ID of the template to edit.
 * @param {object} templateProps - An object with ??
 * @return {promise} A promise that resolves when the template is edited
 */
module.exports = (_id, templateProps) => {
  return Template.findByIdAndUpdate({ _id }, templateProps).catch(err => {
    addErrorEvent(err, "template query error");
  });
};
