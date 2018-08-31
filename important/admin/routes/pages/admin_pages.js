const express = require("express");
const router = express.Router();
const auth = require("../../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
/* grab controller */
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

/* Exports */
module.exports = router;