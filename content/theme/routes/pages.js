const express = require("express");
const router = express.Router();

const pagesController = require("../controllers/pages_controller");

/*
* GET /
*/
router.get("/", pagesController.home);

/*
* GET a page
*/
router.get("/:slug", pagesController.anyPage);

//Exports
module.exports = router;
