const BlogComments = require("../../blogComments");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

  /**
 * Deletes a single blog comment from the Blog Comment collection
 * @param {string} _id - The ID of the comment to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
    return BlogComments.remove({blogref:_id}).catch(err => {
      errorAddEvent(err, "blog comment query error");
    });
  };