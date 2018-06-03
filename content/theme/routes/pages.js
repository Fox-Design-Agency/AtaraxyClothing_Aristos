const express = require("express")
const router = express.Router();
// GET page model
const Page = require("../../../includes/models/page")
//GET blogs model
const Blog = require("../../upgrade/blog/models/blog")
//GET media model
const Media = require("../../../includes/models/media")

/*
* GET /
*/

router.get("/", function (req, res) {
    Page.findOne({ slug: "home" }, function (err, page) {
        if (!page) {
            let page = new Page({
                title: "Home",
                slug: "home",
                content: "You should put stuff here and stuff.",
                parent: "home",
                description: "",
                keywords: "",
                author: ""
            });
            Media.find({}, function (err, media) {
                if (err) {
                    console.log(err);
                }
                page.save(function (err) {
                    if (err) { return console.log(err) };
                    res.render("index", {
                        title: page.title,
                        content: page.content,
                        keywords: page.keywords,
                        description: page.description,
                        author: page.author,
                        media: media
                    })
                })
            })
        } else {
            Media.find({}, function (err, media) {
                if (err) {
                    console.log(err);
                }
                res.render("index", {
                    title: page.title,
                    content: page.content,
                    keywords: page.keywords,
                    description: page.description,
                    author: page.author,
                    media: media
                })
            })
        }
    })
})

/*
* GET a page
*/

router.get("/:slug", function (req, res) {
    let slug = req.params.slug;
    Page.findOne({ slug: slug }, function (err, page) {
        if (err) {
            console.log(err);
        }

        if (!page) {
            res.redirect("/")
        } else {
            res.render("index", {
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