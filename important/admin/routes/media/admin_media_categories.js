const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const mediaCategoriesController = require("../../controllers/media/admin_media_categories_controller");

/*
* GET media category index
*/
router.get("/", isAdmin, mediaCategoriesController.index);

/*
* GET, POST add media category
*/
router
  .route("/add-media-category")
  .get(isAdmin, mediaCategoriesController.addIndex)
  .post(mediaCategoriesController.create);

/*
* GET, POST edit media category
*/
router
  .route("/edit-media-category/:id")
  .get(isAdmin, mediaCategoriesController.editIndex)
  .post(mediaCategoriesController.saveEdit);

/*
* GET delete media category
*/
// needs to also remove the folder in the public
router.delete(
  "/delete-media-category/:id",
  isAdmin,
  mediaCategoriesController.delete
);

/* Exports */
module.exports = router;
