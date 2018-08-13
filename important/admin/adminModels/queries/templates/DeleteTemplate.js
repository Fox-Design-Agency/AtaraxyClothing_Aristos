const Template = require("../../templates");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single template from the Template collection
 * @param {string} _id - The ID of the template to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return Template.findByIdAndRemove(_id).catch(err => {
    addErrorEvent(err, "template query error");
  });
};
