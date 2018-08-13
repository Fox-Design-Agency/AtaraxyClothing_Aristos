const User = require("../../user");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds a single user in the USer collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the user that matches the id
 */
module.exports = _id => {
  return User.findById(_id).catch(err => {
    addErrorEvent(err, "user query error");
  });
};
