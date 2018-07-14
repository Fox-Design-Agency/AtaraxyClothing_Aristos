const Order = require("../../orders");
// Aristos Logger Path
const Logger = require("../../../../../../important/AristosStuff/AristosLogger/AristosLogger").Logger;
/**
 * Finds a single page in the Page collection.
 * @param {object} pageProps - Object containing title, slug, content, parent, 100, description, keywords, author
 * @return {promise} A promise that resolves with the Page that was created
 */
module.exports = orderProps => {
  const order = new Order(orderProps);
  order.save().catch(err => Logger.error(err));
};
