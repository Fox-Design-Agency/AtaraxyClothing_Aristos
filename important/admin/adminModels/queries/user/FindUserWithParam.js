const User = require("../../user");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Finds all the users that match the param(s) in the User collection.
 * @param {object} stuff - The object of the stuff to find.
 * @return {promise} A promise that resolves with the user(s) that matches the stuff param
 */
module.exports = stuff => {
  return User.find(stuff).catch(err => {
    addErrorEvent(err, "user query error");
  });
};
