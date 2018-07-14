const User = require("../../user");
/* Aristos Logger Path */
const Logger = require("../../../../AristosStuff/AristosLogger/AristosLogger").Logger;

/**
 * Deletes a single user from the User collection
 * @param {string} _id - The ID of the user to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  User.findByIdAndRemove(_id).catch(err => Logger.error(err));
};