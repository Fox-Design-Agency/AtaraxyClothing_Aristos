const Page = require("../../page");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single page in the Page collection.
 * @param {object} pageProps - Object containing title, slug, content, parent, 100, description, keywords, author
 * @return {promise} A promise that resolves with the Page that was created
 */
module.exports = pageProps => {
  const page = new Page(pageProps);
  return page.save().catch(err => {
    addErrorEvent(err, "page query error");
  });
};
