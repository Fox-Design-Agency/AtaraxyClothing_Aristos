const BlogComments = require("../../blogComments");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single blog comment in the Blog Coment collection
 * @param {objectID} _id - The ID of the blog comment to edit.
 * @param {object} blogCommentProps - An object with ??
 * @return {promise} A promise that resolves when the blog comment is edited
 */
module.exports = (_id, blogCommentProps) => {
  return BlogComments.findByIdAndUpdate({ _id }, blogCommentProps).catch(
    err => {
      errorAddEvent(err, "blog comment query error");
    }
  );
};