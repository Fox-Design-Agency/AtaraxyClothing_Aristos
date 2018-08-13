const Media = require("../../medias");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger").addError;
/**
 * Counts the media in the Media collection.
 * @return {promise} A promise that resolves with the count
 */
module.exports = () => {
  return Media.estimatedDocumentCount({}).then(c => {
      return c
    }).catch(err=>{
        addErrorEvent(err, "image media query error")
    })
};