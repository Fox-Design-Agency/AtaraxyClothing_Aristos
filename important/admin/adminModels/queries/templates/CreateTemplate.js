const Template = require("../../templates");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Finds a single page in the Page collection.
 * @param {object} pageProps - Object containing title, slug, content, parent, 100, description, keywords, author
 * @return {promise} A promise that resolves with the Page that was created
 */
module.exports = templateProps => {
  const template = new Template(templateProps);
  return template.save().catch(err => addErrorEvent(err, "template query error"));
};
