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
 * Deletes a single image from the Media collection
 * @param {string} _id - The ID of the media to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = _id => {
  return Media.findByIdAndRemove(_id).catch(err => {
    addErrorEvent(err, "image media query error");
  });
};