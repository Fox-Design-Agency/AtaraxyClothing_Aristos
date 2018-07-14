const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogs_controller");
/*
* GET blog index
*/
router.get("/", blogController.index);

/*
* GET a blog
*/
router.get("/:category/:slug", blogController.singleBlog);

/*
* GET blogs by category
*/
router.get("/:category", blogController.blogByCategory);

//Exports
module.exports = router;
