const Template = require("../../templates");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the templates that match param in the Template collection.
 * @param {object} stuff - The object of the stuff to find.
 * @return {promise} A promise that resolves with the template that matches the stuff param
 */
module.exports = stuff => {
  return Template.find(stuff)
    .populate("author")
    .catch(err => {
      addErrorEvent(err, "template query error");
    });
};