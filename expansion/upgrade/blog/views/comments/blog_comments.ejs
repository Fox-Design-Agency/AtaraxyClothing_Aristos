const express = require("express");
const router = express.Router();
const auth = require("../../../../important/AppStuff/authorization/auth");

const isAdmin = auth.isAdmin;
const blogController = require("../controllers/admin_blog_controller");

/*
* GET blog index
*/
router.get("/", isAdmin, blogController.index);

/*
* GET, POST add blog
*/
router
  .route("/add-blog")
  .get(isAdmin, blogController.addIndex)
  .post(blogController.create);

/*
* GET, POST edit blog
*/
router
  .route("/edit-blog/:id")
  .get(isAdmin, blogController.editIndex)
  .post(blogController.edit);

/*
* GET delete blog
*/
router.delete("/delete-blog/:id", isAdmin, blogController.delete);
/* 
* POST reorder blogs
*/
router.post("/reorder-blogs", blogController.reorder);

/* Exports */
module.exports = router;
