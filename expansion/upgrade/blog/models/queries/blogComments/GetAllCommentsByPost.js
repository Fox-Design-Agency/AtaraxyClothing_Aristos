const BlogComments = require("../../blogComments");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
  /**
 * Finds all the blog coments that match the params in the Blog Comment collection.
 * @param {object} stuff - The object containing the stuff to find.
 * @return {promise} A promise that resolves with the blog comment that matches the stuff param
 */
module.exports = blogID => {
  return BlogComments.find({blogref: blogID}).populate("user").catch(err => {
    errorAddEvent(err, "blog comment query error");
  });
};