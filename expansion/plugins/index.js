/* check folder for what files exist and pass to expansion folder to do stuff with */
const fs = require("fs-extra");

async function grabStuff() {
  const dirs = await fs.readdirSync("./expansion/plugins");
  const index = dirs.indexOf("index.js");
  dirs.splice(index, 1);
  return dirs;
}

async function readStuff() {
  let allTheStuff = [];
  const stuff = await grabStuff().then(dirs => {
    dirs.forEach(files => {
      let json = fs.readJsonSync("./expansion/plugins/" + files + "/info.json")
      allTheStuff.push(json)
      return allTheStuff;
    });
    return allTheStuff;
  });
  return stuff
}

module.exports = readStuff();