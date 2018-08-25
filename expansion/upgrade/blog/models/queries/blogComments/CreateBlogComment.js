const BlogComments = require("../../blogComments");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
  /**
 * Creates a single blog comment in the Blog Comment collection.
 * @param {object} blogCommentProps - Object containing ??
 * @return {promise} A promise that resolves with the blog comment that was created
 */
module.exports = blogCommentProps => {
    const comment = new BlogComments(blogCommentProps);
    return comment.save().catch(err => {
      errorAddEvent(err, "blog comment query error");
    });
  };