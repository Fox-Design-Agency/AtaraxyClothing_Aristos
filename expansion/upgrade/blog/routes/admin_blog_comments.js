const express = require("express");
const router = express.Router();
const auth = require("../../../../important/AppStuff/authorization/auth");

const isAdmin = auth.isAdmin;
const blogCommentsController = require("../controllers/admin_blog_comments_controller");

/*
* GET blog comments index
*/
router.get("/", isAdmin, blogCommentsController.index);

/* Exports */
module.exports = router;
