const Blog = require("../../blog");
/* Aristos Logger Path */
const Logger = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Deletes a single blog from the Blog collection
 * @param {string} _id - The ID of the blog to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
    Blog.findByIdAndRemove(_id).catch(err => Logger.error(err));
};