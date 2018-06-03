const express = require("express")
const router = express.Router();
const auth = require("../../../config/auth")

const isAdmin = auth.isAdmin;


/*
* GET pages index
*/
router.get("/",isAdmin, function (req, res) {

    res.render("../../../includes/admin/views/index", {
                content: ""
            })
})


//Exports
module.exports = router;