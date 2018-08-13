module.exports = {
  name: "Newsletter",
  async theFunction(name, blogCount) {
    return `
    <div class="admin-blocks">
    <a href="/admin">
        <h5>
            ${name}
        </h5>
        <h4>
            doesnt work
        </h4>
        <h5>
        </h5>
        </a>
    </div>
        `;
  }
};
