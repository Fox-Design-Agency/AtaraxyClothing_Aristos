const adminContact = require("./routes/admin_contact")
module.exports = app => {
    app.use("/admin/contact", adminContact)
}