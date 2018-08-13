const Template = require("../../templates");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single template in the Template collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the template that matches the id
 */
module.exports = _id => {
  return Template.findById(_id).catch(err => {
    addErrorEvent(err, "template query error");
  });
};
