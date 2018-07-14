const Media = require("../../medias");
/* Aristos Logger Path */
const Logger = require("../../../../AristosStuff/AristosLogger/AristosLogger").Logger;
/**
 * Finds a single page in the Page collection.
 * @param {object} pageProps - Object containing <change this>
 * @return {promise} A promise that resolves with the Page that was created
 */
module.exports = mediaProps => {
    const media = new Media(mediaProps);
    return media.save().catch(err => Logger.error(err));
};
