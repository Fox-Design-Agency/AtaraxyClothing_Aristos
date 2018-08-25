require("./routes/admin_contact_routes_checker").theFunction();

const fs = require("fs-extra");
const adminContact = fs.readJSONSync(
  "./expansion/upgrade/contact/routes/contactRoutes.json"
).route;
const adminContacts = require(adminContact);

module.exports = app => {
  app.use("/admin/contact", adminContacts);
};