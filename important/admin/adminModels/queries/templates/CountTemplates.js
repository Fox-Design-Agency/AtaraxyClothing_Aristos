const Template = require("../../templates");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Counts the templates in the Template collection.
 * @return {promise} A promise that resolves with the count
 */
module.exports = () => {
  return Template.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      addErrorEvent(err, "template query error");
    });
};
 