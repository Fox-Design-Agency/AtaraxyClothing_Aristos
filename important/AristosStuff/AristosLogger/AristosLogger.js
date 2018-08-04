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
*
*/
const fs = require("fs-extra");
/*
**********************************************************
* after require import
* use like this:
* Logger.info("Stuffs here.")
* Logger.error(err)
* Logger.debug(shouldThisHappen???) <- maybe not like this
**********************************************************
*/
/* create log directory and nessesary files */
/*keep these in the .gitignore so they are not pushed */
fs.ensureDirSync("./important/AristosStuff/AristosLogger/logs");
fs.ensureFileSync("./important/AristosStuff/AristosLogger/logs/debug.json");
fs.ensureFileSync("./important/AristosStuff/AristosLogger/logs/error.json");
fs.ensureFileSync("./important/AristosStuff/AristosLogger/logs/info.json");
/*
**********************************************************
*           Get File Writes
*           Not exported directly
*           **F001**
*
**********************************************************
*/
/* save config items */
let saveInfoItem = items => {
  fs.writeFileSync(
    "./important/AristosStuff/AristosLogger/logs/info.json",
    JSON.stringify(items)
  );
}; /* end of save config item */
/* save config items */
let saveErrorItem = items => {
  fs.writeFileSync(
    "./important/AristosStuff/AristosLogger/logs/error.json",
    JSON.stringify(items)
  );
}; /* end of save config item */
/* save config items */
let saveDebugItem = items => {
  fs.writeFileSync(
    "./important/AristosStuff/AristosLogger/logs/debug.json",
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
let fetchInfoLog = () => {
  try {
    const configString = fs.readFileSync(
      "./important/AristosStuff/AristosLogger/logs/info.json"
    );
    return (config = JSON.parse(configString));
  } catch (e) {
    return [];
  }
}; /* end of fetch config */
/* grab all config items */
let fetchErrorLog = () => {
  try {
    const configString = fs.readFileSync(
      "./important/AristosStuff/AristosLogger/logs/error.json"
    );
    return (config = JSON.parse(configString));
  } catch (e) {
    return [];
  }
}; /* end of fetch config */
/* grab all config items */
let fetchDebugLog = () => {
  try {
    const configString = fs.readFileSync(
      "./important/AristosStuff/AristosLogger/logs/debug.json"
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
let clearInfoLog = num => {
  saveInfoItem([]);
}; /* end of remove config item */
/* remove config item */
let clearSomeNewInfoLog = num => {
  let items = fetchInfoLog();
  let filteredItems = [];
  let i = 0;
  while (num < items.length) {
    filteredItems.push(items[i]);
    ++i;
    ++num;
  }
  saveInfoItem(filteredItems);
}; /* end of remove config item */
let clearSomeOldInfoLog = num => {
  let items = fetchInfoLog();
  let filteredItems = [];
  let i = num;
  while (num > 0) {
    filteredItems.push(items[i]);
    ++i;
    --num;
  }
  saveInfoItem(filteredItems);
}; /* end of remove config item */
/* remove config item */
let clearDebugLog = () => {
  saveDebugItem([]);
}; /* end of remove config item */
/* remove config item */
let clearSomeNewDebugLog = num => {
  let items = fetchDebugLog();
  let filteredItems = [];
  let i = 0;
  while (num < items.length) {
    filteredItems.push(items[i]);
    ++i;
    ++num;
  }
  saveDebugItem(filteredItems);
}; /* end of remove config item */
let clearSomeOldDebugLog = num => {
  let items = fetchDebugLog();
  let filteredItems = [];
  let i = num;
  while (num > 0) {
    filteredItems.push(items[i]);
    ++i;
    --num;
  }
  saveDebugItem(filteredItems);
}; /* end of remove config item */
/* remove config item */
let clearErrorLog = () => {
  saveErrorItem([]);
}; /* end of remove config item */
/* remove config item */
let clearSomeNewErrorLog = num => {
  let items = fetchErrorLog();
  let filteredItems = [];
  let i = 0;
  while (num < items.length) {
    filteredItems.push(items[i]);
    ++i;
    ++num;
  }
  saveErrorItem(filteredItems);
}; /* end of remove config item */
let clearSomeOldErrorLog = num => {
  let items = fetchErrorLog();
  let filteredItems = [];
  let i = num;
  while (num > 0) {
    filteredItems.push(items[i]);
    ++i;
    --num;
  }
  saveErrorItem(filteredItems);
}; /* end of remove config item */
/*
**********************************************************
*           Read File Contents
*           **F004**
*
**********************************************************
*/
/* read config item */
let readAllInfo = () => {
  try {
    let items = fetchInfoLog();
    return items;
  } catch (e) {
    return "none";
  }
}; /* end of read config item */
/* read config item */
let readSomeInfo = num => {
  try {
    let items = fetchInfoLog();
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
/* read config item */
let readAllError = num => {
  try {
    let items = fetchErrorLog();
    return items;
  } catch (e) {
    return "none";
  }
}; /* end of read config item */
/* read config item */
let readSomeError = (name, num) => {
  try {
    let items = fetchErrorLog();
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
/* read config item */
let readAllDebug = name => {
  try {
    let items = fetchDebugLog();
    return items;
  } catch (e) {
    return "none";
  }
}; /* end of read config item */
/* read config item */
let readSomeDebug = (name, num) => {
  try {
    let items = fetchDebugLog();
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
addInfo = (stuffs, name = "infoEvent") => {
  let items = fetchInfoLog();
  let item = {
    name: name,
    date: new Date().toString(),
    info: stuffs
  };
  items.push(item);
  saveInfoItem(items);
  return item;
}; /* end of add a config item */

/* use for debugging new implementation */
addDebug = (stuffs, name = "debugEvent") => {
  let items = fetchDebugLog();
  let item = {
    name: name,
    date: new Date().toString(),
    info: stuffs
  };
  items.push(item);
  saveDebugItem(items);
  return item;
}; /* end of add a config item */

/* use for error logging */
addError = (stuffs, name = "errorEvent") => {
  let items = fetchErrorLog();
  let item = {
    name: name,
    date: new Date().toString(),
    info: stuffs
  };
  items.push(item);
  saveErrorItem(items);
  return item;
}; /* end of add an error log */

/*
**********************************************************
*           Temp Test of Log Files
*           **F006**
*
**********************************************************
*/
/* possibly temp log config item */
logInfoItems = () => {
  let items = fetchInfoLog();
  items.forEach(item => {
    console.log("----");
    console.log("Name:" + item.name);
    console.log("Date:" + item.date);
    console.log("Info: " + item.info);
  });
}; /* end of log config item */
/* possibly temp log config item */
logDebugItems = () => {
  let items = fetchInfoLog();
  items.forEach(item => {
    console.log("----");
    console.log("Name:" + item.name);
    console.log("Date:" + item.date);
    console.log("Info: " + item.info);
  });
}; /* end of log config item */
/* possibly temp log config item */
logErrorItems = () => {
  let items = fetchInfoLog();
  items.forEach(item => {
    console.log("----");
    console.log("Name:" + item.name);
    console.log("Date:" + item.date);
    console.log("Info: " + item.info);
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
  addInfo,
  addError,
  addDebug,
  readAllInfo,
  readSomeInfo,
  readAllError,
  readSomeError,
  readAllDebug,
  readSomeDebug,
  clearInfoLog,
  clearSomeNewInfoLog,
  clearSomeOldInfoLog,
  clearErrorLog,
  clearSomeNewErrorLog,
  clearSomeOldErrorLog,
  clearDebugLog,
  clearSomeNewDebugLog,
  clearSomeOldDebugLog,
  logDebugItems,
  logErrorItems,
  logInfoItems
};
