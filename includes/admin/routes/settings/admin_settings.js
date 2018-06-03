const express = require("express")
const router = express.Router();
const auth = require("../../../config/auth")
const fs = require("fs-extra");
const isAdmin = auth.isAdmin;


/*
* GET admin settings
*/
router.get("/",isAdmin, function (req, res) {
    res.render("../../../includes/admin/views/settings/settings", {
        content: ""
    })
})

/*
* POST admin settings save
*/
router.post("/",isAdmin, function (req, res) {
    res.render("../../../includes/admin/views/settings/settings", {
        content: ""
    })
})

/*
* GET admin settings cancel
*/
router.get("/cancel",isAdmin, function (req, res) {
    res.render("../../../includes/admin/views/index", {
        content: ""
    })
})

//Exports
module.exports = router;