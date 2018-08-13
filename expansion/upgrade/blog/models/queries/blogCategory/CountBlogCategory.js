const BlogCategory = require("../../blogCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * counts the blog category in the Blog Category collection.
 * @return {promise} A promise that resolves with the Page that was created
 */
module.exports = () => {
  return BlogCategory.estimatedDocumentCount({})
    .then(c => {
      return c;
    })
    .catch(err => {
      errorAddEvent(err, "blog category query error");
    });
};


