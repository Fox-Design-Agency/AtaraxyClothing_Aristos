const express = require("express");
const router = express.Router();
const auth = require("../../../../important/AppStuff/authorization/auth");

const isAdmin = auth.isAdmin;
const blogCommentsController = require("../controllers/admin_blog_comments_controller");

/*
* GET blog comments index
*/
router.get("/by-post/:id", isAdmin, blogCommentsController.indexByPost);

/* 
* GET, POST blog comment
*/
router
  .route("/add-comment/:id")
  .get(isAdmin, blogCommentsController.addIndex)
  .post(blogCommentsController.addCreate);

/*
* DELETE blog comments
*/

router.delete("/delete-comment/:id", blogCommentsController.delete);


/* Exports */
module.exports = router;
