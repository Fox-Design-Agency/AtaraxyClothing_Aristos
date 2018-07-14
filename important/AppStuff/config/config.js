const fs = require("fs-extra");
/* make sure the stuff.json file exists */
fs.ensureFileSync("./important/AppStuff/config/stuff.json");
/* grab all config items */
let fetchConfig = () => {
  try {
    const configString = fs.readFileSync("./important/AppStuff/config/stuff.json");
    return (config = JSON.parse(configString));
  } catch (e) {
    return [];
  }
}; /* end of fetch config */
/* save config items */
let saveItem = items => {
  fs.writeFileSync("./important/AppStuff/config/stuff.json", JSON.stringify(items));
}; /* end of save config item */
/* add a config item */
let addItem = (name, info) => {
  let items = fetchConfig();
  let item = {
    name,
    info
  };
  let duplicateItems = items.filter(item => item.name === name);
  if (duplicateItems.length === 0) {
    items.push(item);
    saveItem(items);
    return item;
  }
}; /* end of add a config item */
/* update config item */
let updateItem = (name, info) => {
  remove(name);
  return addItem(name, info);
}; /* end of update config item */
/* get all config items */
let getAll = () => {
  return fetchConfig();
}; /* end of get all config items */
/* read config item */
let read = name => {
  try {
    let items = fetchConfig();
    let filteredItems = items.filter(item => item.name === name);
    return filteredItems[0].info;
  } catch (e) {
    return "none";
  }
}; /* end of read config item */
/* remove config item */
let remove = name => {
  let items = fetchConfig();
  let filteredItems = items.filter(item => item.name !== name);
  saveItem(filteredItems);
  return items.length !== filteredItems.length;
}; /* end of remove config item */
/* possibly temp log config item */
let logItem = item => {
  console.log("----");
  console.log("Name:" + item.name);
  console.log("Info: " + item.info);
}; /* end of log config item */
/* export the config crud functions */
module.exports = {
  addItem,
  getAll,
  read,
  remove,
  updateItem,
  logItem
};
