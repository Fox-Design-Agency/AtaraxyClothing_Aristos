const User = require("../../user");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the users in the User collection.
 * @return {promise} A promise that resolves with all the users
 */
module.exports = () => {
  return User.find({}).catch(err => {
    addErrorEvent(err, "user query error");
  });
};
