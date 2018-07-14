const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const imageController = require("../../controllers/media/admin_add_media_image_controller");

/*
* GET, POST add media index
*/
router
  .route("/")
  .get(isAdmin, imageController.index)
  .post(imageController.create);

/*
* GET, POST upload Image
*/
router
  .route("/upload-image")
  .get(isAdmin, imageController.upload)
  .post(imageController.uploadCreate);

/*
* GET, POST edit image
*/
router
  .route("/edit-image/:id")
  .get(isAdmin, imageController.edit)
  .post(imageController.saveEdit);

/*
* DELETE delete image
*/
router.delete("/delete-image/:id", isAdmin, imageController.delete);
/*
* DELETE trash delete image
*/
router.get("/trash-delete-image/:id", isAdmin, imageController.trashDelete);
/*
* GET, POST upload video
*/
router.route("/upload-video")
.get(isAdmin, (req, res)=> {
  let title = "";
  let alt = "";
  MediaCategory.find(function(err, categories) {
    if (err) {
      Logger.error(err);
    }
    res.render("../../../includes/admin/views/media/add_image", {
      title: title,
      alt: alt,
      categories: categories
    });
  });
})
.post( (req, res) =>{
  User.findById(req.session.passport.user, function(err, user) {
    if (err) {
      Logger.error(err);
    }
    if (user.admin === 1) {
    } else {
      res.redirect("/users/login");
    }
  });
});

/*
* GET edit video
*/
router.get("/edit-video/:id", isAdmin, function(req, res) {
  res.render("../../../includes/admin/views/media/edit_video", {
    content: ""
  });
});

/*
* GET delete video
*/
router.delete("/delete-video/:video", isAdmin, function(req, res) {
  let originalImage =
    "public/product_images/" + req.query.id + "/gallery/" + req.params.image;
  let thumbsImage =
    "public/product_images/" +
    req.query.id +
    "/gallery/thumbs/" +
    req.params.image;

  fs.remove(originalImage, function(err) {
    if (err) {
      Logger.error(err);
    } else {
      fs.remove(thumbsImage, function(err) {
        if (err) {
          Logger.error(err);
        } else {
          req.flash("success", "Image deleted!");
          res.redirect("/admin/products/edit-products/" + req.query.id);
        }
      });
    }
  });
});

/* Exports */
module.exports = router;
