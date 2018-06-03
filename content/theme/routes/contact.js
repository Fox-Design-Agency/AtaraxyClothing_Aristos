const express = require("express")
const router = express.Router();

//GET blog category model
const Category = require("../../upgrade/blog/models/blogCategory")
// GET page model
const Page = require("../../../includes/models/page")







/*
* GET blog index
*/

router.get("/", function (req, res) {
    Page.findOne({ slug: "contact" }, function (err, page) {
        if (err) {
            console.log(err);
        }

        if (!page) {
            res.redirect("/")
        } else {
            res.render("contact", {
                title: page.title,
                content: page.content,
                keywords: page.keywords,
                description: page.description,
                author: page.author
            })
        }
    })
    })

    
//Exports
module.exports = router;