const MediaCategory = require("../../mediaCategory");
/* Aristos Logger Path */
const Logger = require("../../../../AristosStuff/AristosLogger/AristosLogger").Logger;
/**
 * Finds a single page in the Page collection.
 * @param {object} pageProps - Object containing <change this>
 * @return {promise} A promise that resolves with the Page that was created
 */
module.exports = mediaCategoryProps => {
  const mediaCategory = new MediaCategory(mediaCategoryProps);
  mediaCategory.save().catch(err => Logger.error(err));
};
