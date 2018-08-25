const BlogCategory = require("../../blogCategory");
/* Aristos Logger Path */
const errorAddEvent = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Edits a single blog category in the Blog Category collection
 * @param {objectID} _id - The ID of the blog category to edit.
 * @param {object} blogCategoryProps - An object with title, slug, description, keywords, author
 * @return {promise} A promise that resolves when the blog category is edited
 */
module.exports = (_id, blogCategoryProps) => {
  return BlogCategory.findByIdAndUpdate({ _id }, blogCategoryProps).catch(
    err => {
      errorAddEvent(err, "blog category query error");
    }
  );
};