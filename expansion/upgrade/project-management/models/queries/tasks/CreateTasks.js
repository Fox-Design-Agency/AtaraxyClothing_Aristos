const Task = require("../../tasks");
/* Aristos Logger Path */
const Logger = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;
/**
 * Finds a single page in the Page collection.
 * @param {object} pageProps - Object containing title, slug, content, parent, 100, description, keywords, author
 * @return {promise} A promise that resolves with the Page that was created
 */
module.exports = taskProps => {
  const task = new Task(taskProps);
  task.save().catch(err => Logger.error(err));
};
