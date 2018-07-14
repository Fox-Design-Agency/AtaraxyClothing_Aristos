const express = require("express");
const router = express.Router();
const auth = require("../../../../important/AppStuff/authorization/auth");

const isAdmin = auth.isAdmin;
const blogCategoriesController = require("../controllers/admin_blog_categories_controller");
/*
* GET category index
*/
router.get("/", isAdmin, blogCategoriesController.index);

/*
* GET, POST add category
*/
router
  .route("/add-blog-category")
  .get(isAdmin, blogCategoriesController.addIndex)
  .post(blogCategoriesController.create);

/*
* GET, POST edit category
*/
router
  .route("/edit-blog-category/:id")
  .get(isAdmin, blogCategoriesController.editIndex)
  .post(blogCategoriesController.edit);

/*
* GET delete page
*/
router.delete(
  "/delete-blog-category/:id",
  isAdmin,
  blogCategoriesController.delete
);
/* 
* POST reorder blog category
*/
router.post("/reorder-blog-categories", blogCategoriesController.reorder);

/* Exports */
module.exports = router;
