const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pages_controller");
/*
* GET contact page
*/
router.get("/", pagesController.contact);

//Exports
module.exports = router;
