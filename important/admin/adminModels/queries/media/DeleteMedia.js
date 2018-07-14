const Media = require("../../medias");
/* Aristos Logger Path */
const Logger = require("../../../../AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Deletes a single image from the Media collection
 * @param {string} _id - The ID of the page to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
    Media.findByIdAndRemove(_id).catch(err => Logger.error(err));
};
