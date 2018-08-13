const Blog = require("../../blog");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Creates a single Blog in the Blog collection.
 * @param {object} blogProps - Object containing title, slug, content, category, 0, description, keywords, author, allowComments
 * @return {promise} A promise that resolves with the Blog that was created
 */
module.exports = blogProps => {
  const blog = new Blog(blogProps);
  return blog.save().catch(err => errorAddEvent(err, "blog query error"));
};

