const Task = require("../../tasks");
/* Aristos Logger Path */
const Logger = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Deletes a single page from the Page collection
 * @param {string} _id - The ID of the page to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
    Task.findByIdAndRemove(_id).catch(err => Logger.error(err));
};