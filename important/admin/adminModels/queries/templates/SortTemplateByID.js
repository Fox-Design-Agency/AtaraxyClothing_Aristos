const Template = require("../../templates");
/* Aristos Logger Path */
// const addErrorEvent = require("../../../../AristosStuff/AristosLogger/AristosLogger").addError;

/**
 * Sorts pages by ids.
 * @param {string} _id - The ID of the record to find.
 * @return {promise} A promise that resolves with the page that matches the id
 */
module.exports = (ids) => {
   return sortPages(ids, ()=>{
    Template.find({}).sort({ sorting: 1 });
    })
};/* end of exports */
/* Sort pages function */
/* rebuild so that pages sort in category view use all pages id to not mess up ordering */
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
  }; /* end of sort pages function */