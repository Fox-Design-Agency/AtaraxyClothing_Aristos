const User = require("../../user");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Creates a single user in the User collection.
 * @param {object} userProps - Object containing <insert stuff here>
 * @return {promise} A promise that resolves with the user that was created
 */
module.exports = userProps => {
  const user = new User(userProps);
  return user.save().catch(err => {
    addErrorEvent(err, "user query error");
  });
};
