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
 * Finds all the media match params in the Media collection.
 * @param {object} stuffs - The object of the stuff to find.
 * @return {promise} A promise that resolves with the media that matches the stuff param
 */
module.exports = stuffs => {
  return Media.find(stuffs)
    .populate("category")
    .catch(err => {
      addErrorEvent(err, "image media query error");
    });
};