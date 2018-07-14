const express = require("express");
const router = express.Router();

const pagesController = require("../controllers/pages_controller");
/*
* GET about index
*/
router.get("/", pagesController.about);

//Exports
module.exports = router;
