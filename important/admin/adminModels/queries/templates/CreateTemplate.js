const Template = require("../../templates");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single template in the Template collection.
 * @param {object} templateProps - Object containing ??
 * @return {promise} A promise that resolves with the Template that was created
 */
module.exports = templateProps => {
  const template = new Template(templateProps);
  return template.save().catch(err => {
    addErrorEvent(err, "template query error");
  });
};
