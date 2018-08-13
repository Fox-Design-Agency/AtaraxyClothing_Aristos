const User = require("../../user");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Deletes a single user from the User collection
 * @param {string} _id - The ID of the user to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return User.findByIdAndRemove(_id).catch(err => {
    addErrorEvent(err, "user query error");
  });
};
