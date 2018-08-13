const BlogCategory = require("../../blogCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the blog categories that match the params in the Blog Category collection.
 * @param {object} stuff - The object containing the stuff to find.
 * @return {promise} A promise that resolves with the blog category that matches the stuff param
 */
module.exports = stuff => {
  return BlogCategory.find(stuff).catch(err => {
    errorAddEvent(err, "blog category query error");
  });
};


