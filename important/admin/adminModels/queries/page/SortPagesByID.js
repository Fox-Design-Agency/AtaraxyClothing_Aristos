const Page = require("../../page");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Sorts pages by ids.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the page that matches the id
 */
module.exports = ids => {
  return sortPages(ids, () => {
    Page.find({})
      .sort({ sorting: 1 })
      .catch(err => {
        addErrorEvent(err, "page query error");
      });
  });
}; /* end of exports */
/* Sort pages function */
/* rebuild so that pages sort in category view use all pages id to not mess up ordering */
function sortPages(ids, cb) {
  let count = 0;

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function(count) {
      Page.findById(id, function(err, page) {
        if (err) {
          Logger.error(err);
        }
        page.sorting = count;
        page.save(function(err) {
          if (err) {
            Logger.error(err);
          }

          ++count;
          if (count >= ids.length) {
            cb();
          }
        });
      });
    })(count);
  }
} /* end of sort pages function */
