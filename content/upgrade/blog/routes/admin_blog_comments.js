const express = require("express")
const router = express.Router();
const auth = require("../../../../includes/config/auth")
// const isAdmin = auth.isAdmin;

// GET Blog category model
const Category = require("../models/blogCategory")
// GET blog model
const Blog = require("../models/blog")

/*
* GET blog comments index
*/
router.get("/",isAdmin, function (req, res) {
    let count;

    Blog.count(function (err, c) {
        count = c;
    })
    Blog.find(function (err, blogs) {
        if (err) {
            return console.log(err)
        } else {
            res.render("../../upgrade/blog/views/blogs/blogs", {
                blogs: blogs,
                count: count
            })
        }
    })
})
