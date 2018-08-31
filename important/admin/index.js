require("./routes/checkers/media/admin_media_routes_checker").theFunction();
const fs = require("fs-extra");
/* */
const adminPages = require("./routes/pages/admin_pages");
const adminHome = require("./routes/dashboard/admin_home");

const adminMediaCategories = require("./routes/media/admin_media_categories");
const adminSettings = require("./routes/settings/admin_settings");
const adminUserControls = require("./routes/userControls/admin_user_controls");
const adminLogsViewer = require("./routes/logsViewer/admin_logs");
const adminTemplateBuilder = require("./routes/templateBuilder/admin_template_builder");
const adminUpdater = require("./routes/updater/admin_updater");
let adminAddMedia;
try {
  const adminAddMedias = fs.readJSONSync(
    "./important/admin/routes/checkers/media/MediaRoutes.json"
  ).route;
  adminAddMedia = require(adminAddMedias);
} catch (err) {
  adminAddMedia = require("./routes/media/admin_add_media");
}
module.exports = app => {
  /* */

  app.use("/admin/add-media", adminAddMedia);
  app.use("/admin/media-categories", adminMediaCategories);
  app.use("/admin/template-builder", adminTemplateBuilder);
  app.use("/admin/pages", adminPages);
  app.use("/admin/settings", adminSettings);
  app.use("/admin/user-controls", adminUserControls);
  app.use("/admin/logs-viewer", adminLogsViewer);
  app.use("/admin/updater", adminUpdater);
  app.use("/admin", adminHome);
  /* */

  /* */
  require("../../expansion")(app);
  require("../../content/theme")(app);
  /* */
};