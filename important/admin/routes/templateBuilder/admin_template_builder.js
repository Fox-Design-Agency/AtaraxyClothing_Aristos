const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;

const templateBasicController = require("../../controllers/templates/admin_templates_basic_controller");

/* GET index template builder */

router.get("/", templateBasicController.index);

/* GET add basic template  */
router
  .route("/add-basic")
  .get(templateBasicController.addIndex)
  .post(templateBasicController.basicCreate);

/* GET edit basic template  */
router
  .route("/edit-basic/:id")
  .get(templateBasicController.editIndex)
  .post(templateBasicController.basicUpdate);

/* GET delete basic template  */
router.delete("/delete-basic/:id", templateBasicController.basicDelete);

/* GET drag and drop template builder  */
router.get("/builder", (req, res, next) => {
  res.render("../../../important/admin/views/templateBuilder/templateBuilder", {
    content: "",
    title: "",
    author: "",
    keywords: ""
  });
});

/* Exports */
module.exports = router;
