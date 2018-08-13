/* config for working with the site stats json */

/*
*
*           Table of Contents:
*           **F001**   - Get File Writes
*           **F002**   - Get File Contents
*           **F003**   - Clear File Contents
*           **F004**   - Read File Contents
*           **F005**   - Add File Contents
*           **F006**   - Temp Test of Log Files
*           **F007**   - Exports
*
*/
const fs = require("fs-extra");
const moment = require("moment");
/*
**********************************************************
* after require import
* use like this:
*
**********************************************************
*/
/* create log directory and nessesary files */
/*keep these in the .gitignore so they are not pushed */
fs.ensureDirSync("./important/AristosStuff/AristosSiteStats/logs");
fs.ensureFileSync(
  "./important/AristosStuff/AristosSiteStats/logs/siteStats.json"
);

/*
**********************************************************
*           Get File Writes
*           Not exported directly
*           **F001**
*
**********************************************************
*/
/* save config items */
let saveStatsItem = items => {
  fs.writeFileSync(
    "./important/AristosStuff/AristosSiteStats/logs/siteStats.json",
    JSON.stringify(items)
  );
}; /* end of save config item */
/*
**********************************************************
*           Save File Contents
*           Not exported directly
*           **F002**
*
**********************************************************
*/
/* grab all config items */
let fetchStatsLog = () => {
  try {
    const configString = fs.readFileSync(
      "./important/AristosStuff/AristosSiteStats/logs/siteStats.json"
    );
    return (config = JSON.parse(configString));
  } catch (e) {
    return [];
  }
}; /* end of fetch config */
/*
**********************************************************
*           Clear File Contents
*           **F003**
*
**********************************************************
*/

/* remove config item */
let clearStatsLog = num => {
  saveStatsItem([]);
}; /* end of remove config item */
/* remove config item */
let clearSomeNewStatsLog = num => {
  let items = fetchStatsLog();
  let filteredItems = [];
  let i = 0;
  while (num < items.length) {
    filteredItems.push(items[i]);
    ++i;
    ++num;
  }
  saveStatsItem(filteredItems);
}; /* end of remove config item */
let clearSomeOldStatsLog = num => {
  let items = fetchStatsLog();
  let filteredItems = [];
  let i = num;
  while (num > 0) {
    filteredItems.push(items[i]);
    ++i;
    --num;
  }
  saveStatsItem(filteredItems);
}; /* end of remove config item */
/*
**********************************************************
*           Read File Contents
*           **F004**
*
**********************************************************
*/
/* read config item */
let readAllStats = () => {
  try {
    let items = fetchStatsLog();
    return items;
  } catch (e) {
    return "none";
  }
}; /* end of read config item */
/* read config item */
let readSomeStats = num => {
  try {
    let items = fetchStatsLog();
    let filteredItems = [];
    let i = items.length - 1;
    while (num > 0) {
      filteredItems.push(items[i]);
      --num;
      --i;
    }
    return filteredItems;
  } catch (e) {
    return "none";
  }
}; /* end of read config item */
/*
**********************************************************
*           Add File Contents
*           **F005**
*
**********************************************************
*/
// functions to write messages to the log files
// also places current date
/* use for admin logs and basic info */
addStats = (stuffs, name = "siteStats") => {
  let items = fetchStatsLog();
  let item = {
    name: name,
    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    data: stuffs
  };
  items.push(item);
  saveStatsItem(items);
  return item;
}; /* end of add a config item */
/*
  /*
**********************************************************
*           Update File Contents
*           **F005**
*
**********************************************************
*/
// functions to write messages to the log files
// also places current date
/* use for admin logs and basic info */
updateStats = (stuffs, name = "siteStats") => {
  let items = fetchStatsLog();
  let item = {
    name: name,
    data: stuffs
  };

  let filtered = items.filter(json => json.name === name);
  if (filtered.length > 0) {
    filtered[0].data += stuffs;
    let removed = items.filter(json => json.name !== name);
    removed.push(filtered[0]);
    saveStatsItem(removed);
    return item;
  } else {
    items.push(item);
    saveStatsItem(items);
    return item;
  }
}; /* end of add a config item */
/*
**********************************************************
*           Temp Test of Log Files
*           **F006**
*
**********************************************************
*/
/* possibly temp log config item */
logStatsItems = () => {
  let items = fetchStatsLog();
  items.forEach(item => {
    console.log("----");
    console.log("Name:" + item.name);
    console.log("Info: " + item.data);
  });
}; /* end of log config item */
/*
**********************************************************
*           Exports
*           **F007**
*
**********************************************************
*/
module.exports = {
  updateStats,
  addStats,
  readAllStats,
  readSomeStats,
  clearStatsLog,
  clearSomeNewStatsLog,
  clearSomeOldStatsLog,
  logStatsItems
};
