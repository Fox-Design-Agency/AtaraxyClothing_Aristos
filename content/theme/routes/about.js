const express = require("express")
const router = express.Router();

//GET blog category model
const Category = require("../../upgrade/blog/models/blogCategory")

// GET page model
const Page = require("../../../includes/models/page")
//GET media model
const Media = require("../../../includes/models/media")



/*
* GET blog index
*/

router.get("/", function (req, res) {
    Page.findOne({ slug: "about" }, function (err, page) {
        Media.findOne({ category: "main_slider" }, function (err, media) {
            Media.find({ category: "team" }, function (err, teams) {
                if (err) {
                    console.log(err);
                }

                if (!page) {
                    res.redirect("/")
                } else {
                    res.render("about_us", {
                        title: page.title,
                        content: page.content,
                        keywords: page.keywords,
                        description: page.description,
                        author: page.author,
                        media: media,
                        team: teams
                    })
                }
            })
        })
    })
})


//Exports
module.exports = router;