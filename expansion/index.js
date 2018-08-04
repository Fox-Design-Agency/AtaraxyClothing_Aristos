/* this should properly know the plugins and upgrade currently available to send to the app */
const fs = require("fs-extra");
/* path to the respective index.js files that check the folders for contents */
/* these hopefully return the info.json files that can then be used to do stuff */
const upgrades = require("./upgrade");
const plugins = require("./plugins");
module.exports = app => {
  /* check upgrades */
  upgrades.then(res => {
    app.locals.upgrades = res;
    res.forEach(files => {
      app.locals[files.variable] = true;
      require("./upgrade/" + files.folder)(app);
    });
  });

  plugins.then(res => {
    res.forEach(files => {
      app.locals[files.variable] = true;
    });
  });
};