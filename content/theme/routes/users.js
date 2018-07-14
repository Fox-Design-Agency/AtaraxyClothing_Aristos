const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users_controller");

/*
* GET register
*/
router.get("/register", usersController.register);

/*
* GET login
*/
router.get("/login", usersController.login);

/*
* POST login
*/
router.post("/login", usersController.processLogin);

/*
* GET logout
*/
router.get("/logout", usersController.logout);

//Exports
module.exports = router;