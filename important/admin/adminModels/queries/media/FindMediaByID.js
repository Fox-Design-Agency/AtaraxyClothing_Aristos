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
 * Finds a single media in the MEdia collection.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the media that matches the id
 */
module.exports = _id => {
  return Media.findById(_id)
    .populate("category")
    .catch(err => {
      addErrorEvent(err, "image media query error");
    });
};