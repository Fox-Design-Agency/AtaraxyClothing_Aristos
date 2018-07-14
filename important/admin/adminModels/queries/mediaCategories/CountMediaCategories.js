const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const Logger = require("../../../../AristosStuff/AristosLogger/AristosLogger").Logger;
/**
 * Finds a single page in the Page collection.
 * @param {object} pageProps - Object containing <change this>
 * @return {promise} A promise that resolves with the Page that was created
 */
module.exports = () => {
  return MediaCategory.count({}).then(c => {
      return c
    })
};