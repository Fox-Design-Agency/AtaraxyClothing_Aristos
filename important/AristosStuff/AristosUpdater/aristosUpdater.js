const request = require("request");
const fs = require("fs-extra");

const addUpdateInfos = require("../AristosLogger/AristosLogger").addUpdate;
const addErrorInfos = require("../AristosLogger/AristosLogger").addError;
/*
* core Update Function
*/
let coreUpdate = (req) => {
  request.get(
    "https://b5tx3g61ie.execute-api.us-east-2.amazonaws.com/default/AristosBasicUpdater",

    function(error, response, body) {
      if (error) {
        req.flash("error_msg", "There was an error with the Update!");
        return addErrorInfos(error, "core update error");
      }

      const content = JSON.parse(body);
      content.forEach(stuff => {
        fs.outputFile(stuff.name, stuff.content);
      });
    }
  );
  addUpdateInfos("some version #", "core update")
  req.flash("success_msg", "System Updated!");
}; /* end of core update function */
/*
* expansion Update Function
*/
let expansionUpdate = something => {
  let upgradeNames = [];
  something.app.locals.upgrades.forEach(name => {
    upgradeNames.push(name.name);
  });
  request.post(
    {
      json: true,
      url:
        "https://b5tx3g61ie.execute-api.us-east-2.amazonaws.com/default/aristos-basic-expansion-updater",

      body: JSON.stringify(upgradeNames)
    },
    function(error, response, body) {
      if (error) {
        something.flash("error_msg", "There was an error with the Update!");
        return addErrorInfos(error, "expansion update error");
      }
      body.forEach(stuff => {
         fs.outputFile(stuff.name, stuff.content);
        // console.log(stuff.name)
      });
    }
  );
  something.flash("success_msg", "Expansions Updated!");
  addUpdateInfos("some version #", "expansion update")
}; /* end of expansion update function */

/*
* theme Update Function
*/
let themeUpdate = (req) => {
  req.flash("success_msg", "Theme Updates Not Currently Available!");
  addUpdateInfos("theme update not available", "theme update");
}; /* end of theme update function */

/* Exports */
module.exports = {
  coreUpdate,
  expansionUpdate,
  themeUpdate
};

