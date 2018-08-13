/* check folder for what files exist and pass to expansion folder to do stuff with */
const fs = require("fs-extra");

async function grabStuff() {
  const dirs = await fs.readdirSync("./expansion/upgrade");
  const index = dirs.indexOf("index.js");
  dirs.splice(index, 1);
  const dashboard = dirs.indexOf("dashboard.js");
  dirs.splice(dashboard, 1);
  return dirs;
}

async function readStuff() {
  let allTheStuff = [];
  const stuff = await grabStuff().then(dirs => {
    dirs.forEach(files => {
      let someGoodName = require("./"+ files +"/dashboard.js");
      let waitingOnFunction = someGoodName
        .theFunction(someGoodName.name)
        .then(resolved => {
          return resolved;
        });
      allTheStuff.push(waitingOnFunction);
      return allTheStuff;
    });
    return allTheStuff;
  });
  return stuff;
}

module.exports = readStuff();