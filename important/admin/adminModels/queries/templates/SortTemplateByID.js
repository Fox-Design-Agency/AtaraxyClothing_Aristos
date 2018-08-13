const Template = require("../../templates");
/* Aristos Logger Path */
const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/**
 * Sorts template by ids.
 * @param {string} ids - The ids of the record to find.
 * @return {promise} A promise that resolves with the sorted templates
 */
module.exports = ids => {
  return sortPages(ids, () => {
    Template.find({})
      .sort({ sorting: 1 })
      .catch(err => {
        addErrorEvent(err, "template query error");
      });
  });
}; /* end of exports */
/* Sort template function */
/* rebuild so that templates sort in category view use all pages id to not mess up ordering */
function sortTemplates(ids, cb) {
  let count = 0;

  for (let i = 0; i < ids.length; i++) {
    let id = ids[i];
    count++;

    (function(count) {
      Template.findById(id, function(err, template) {
        if (err) {
          Logger.error(err);
        }
        template.sorting = count;
        template.save(function(err) {
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
