const adminProjectManagement = require("./routes/admin_project_management");
module.exports = app => {
  app.use("/admin/project-management", adminProjectManagement);
};
