const fs = require("fs-extra");
let Media;
try {
  const Medias = fs.readJSONSync(
    "./important/admin/routes/checkers/media/MediaModelRoutes.json"
  ).route;
  Media = require(Medias);
} catch (err) {
  Media = require("../../medias");
}
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/**
 * Finds all media in the Media collection.
 * @return {promise} A promise that resolves with all the media
 */
module.exports = () => {
  return Media.find({})
    .populate("category")
    .catch(err => {
      addErrorEvent(err, "image media query error");
    });
};