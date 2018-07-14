const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");

const isAdmin = auth.isAdmin;

// grab controller
const simplePagesControler = require("../../controllers/pages/admin_pages_simple_controller");
/*
* GET pages index
*/
router.get("/", isAdmin, simplePagesControler.index);

/*
* GET, POST add page
*/
router
  .route("/add-page")
  .get(isAdmin, simplePagesControler.addIndex)
  .post(simplePagesControler.create);

/* 
* POST reorder pages
*/
router.post("/reorder-pages", simplePagesControler.reorder);
/*
* GET, PUT edit page
*/
router
  .route("/edit-page/:id")
  .get(isAdmin, simplePagesControler.editIndex)
  .post(simplePagesControler.saveEdit);

/*
* GET delete page
*/
router.delete("/delete-page/:id", isAdmin, simplePagesControler.delete);

/*
* GET add dynamic page
*/
/* not a thing yet */
// router.get("/add-dynamic-builder", isAdmin, function(req, res) {
//   let title = "";
//   let slug = "";
//   let content = "";
//   let parent = "";
//   let description = "";
//   let keywords = "";
//   let author = "";
//   Media.find({}, function(err, media) {
//     res.render("../../../includes/admin/views/pages/add_dynamic_builder", {
//       title: title,
//       slug: slug,
//       content: content,
//       parent: parent,
//       media: media,
//       description: description,
//       keywords: keywords,
//       author: author
//     });
//   });
// });
// /*
// * GET edit dynamic page
// */
// router.get("/edit-dynamic-builder/:id", isAdmin, function(req, res) {
//   Page.findById(req.params.id, function(err, page) {
//     if (err) {
//       Logger.error(err);
//     } else {
//       Media.find({}, function(err, media) {
//         res.render("../../../includes/admin/views/pages/edit_dynamic_builder", {
//           title: page.title,
//           slug: page.slug,
//           content: page.content,
//           parent: page.parent,
//           id: page._id,
//           media: media,
//           description: page.description,
//           keywords: page.keywords,
//           author: page.author
//         });
//       });
//     }
//   });
// });

/* Exports */
module.exports = router;
