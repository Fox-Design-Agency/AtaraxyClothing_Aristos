const express = require("express")
const router = express.Router();
const auth = require("../../../config/auth")
const fs = require("fs-extra");
const isAdmin = auth.isAdmin;
// GET user model
const User = require("../../../models/user")

/*
* GET admin settings
*/
router.get("/", isAdmin, function (req, res) {
    res.render("../../../includes/admin/views/settings/settings", {
        content: ""
    })
})

/*
* POST admin settings save
*/
router.post("/", isAdmin, function (req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (user.admin === 1) {
            res.render("../../../includes/admin/views/settings/settings", {
                content: ""
            })
        } else {
            res.redirect("/users/login");
        }
    })
})

/*
* GET admin settings cancel
*/
router.get("/cancel", isAdmin, function (req, res) {
    res.render("../../../includes/admin/views/index", {
        content: ""
    })
})

//Exports
module.exports = router;