const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const Logger = require("../../../../AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Deletes a single image from the Media collection
 * @param {string} _id - The ID of the page to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = id => {
   MediaCategory.findByIdAndRemove({_id: id}).catch(err => Logger.error(err));
};