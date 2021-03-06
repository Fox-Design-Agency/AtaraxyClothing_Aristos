const Template = require("../../templates");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single template in the Template collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the template that matches the id
 */
module.exports = () => {
  return Template.find({})
    .populate("author")
    .sort({ sorting: 1 })
    .catch(err => {
      addErrorEvent(err, "template query error");
    });
};