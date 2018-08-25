const Blog = require("../../blog");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Finds all blogs that match the param in the Blog collection.
 * @param {object} stuff - The param to search for the record(s) to find.
 * @return {promise} A promise that resolves with the blog that matches the stuff param
 */
module.exports = stuff => {
  return Blog.find(stuff)
    .populate("author")
    .populate("category")
    .catch(err => {
      errorAddEvent(err, "blog query error");
    });
};