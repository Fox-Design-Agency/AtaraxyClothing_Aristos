/* contact queries */
const totalMessagesQuery = require("./models/queries/FindAllMessages");

module.exports = {
  name: "Contact",
  async theFunction(name, blogCount) {
    let unreadMessages = "-",
      readMessages = "-",
      totalMessages = "-";
    await totalMessagesQuery().then(total => {
      totalMessages = total.length;
    });
    return `
    <div class="admin-blocks">
    <a href="/admin/contact">
        <h5>
            ${name}
        </h5>
        <h4>
            unread messages:
        </h4>
        <h5>
            ${unreadMessages}
        </h5>
        <h4>
            read messages:
        </h4>
        <h5>
            ${readMessages}
        </h5>
        <h4>
            total messages:
        </h4>
        <h5>
            ${totalMessages}
        </h5>
        </a>
    </div>
        `;
  }
};
