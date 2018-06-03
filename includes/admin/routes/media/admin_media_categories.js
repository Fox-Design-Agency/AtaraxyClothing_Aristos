const express = require("express")
const router = express.Router();
const auth = require("../../../config/auth")
const fs = require("fs-extra");
const mkdirp = require("mkdirp");
const isAdmin = auth.isAdmin;
// GET Media category model
const Category = require("../../../models/mediaCategory")
/*
* GET media category index
*/
router.get("/",isAdmin, function (req, res) {
    let count;

    Category.count(function (err, c) {
        count = c;
    })
    Category.findOne({ title: "General" }, function (err, categories) {
        if (!categories) {
            let category = new Category({
                title: "General",
                slug: "general"
            });
            category.save(function (err) {
                if (err) { return console.log(err) };
                Category.find(function (err, categories) {
                    if (err) {
                        console.log(err)
                    } else {
                        req.app.locals.mediacategories = categories;
                    }
                })
            })
        }
    })
    Category.find(function (err, categories) {
        if (err) {
            return console.log(err)
        } else {
            res.render("../../../includes/admin/views/media/categories/media_categories", {
                categories: categories,
                count: count
            })
        }
    })
})

/*
* GET add media category
*/
router.get("/add-media-category",isAdmin, function (req, res) {
    let title = "";

    res.render("../../../includes/admin/views/media/categories/add_media_category", {
        title: title
    })
})

/*
* POST add category
*/
router.post("/add-media-category", function (req, res) {

    req.checkBody("title", "Title must have a value.").notEmpty();

    let title = req.body.title;
    let slug = title.replace(/\s+/g, "-").toLowerCase();
    let errors = req.validationErrors();

    if (errors) {
        return res.render("../../../includes/admin/views/media/categories/add_media_category", {
            errors: errors,
            title: title
        })
    } else {
        Category.findOne({ slug: slug }, function (err, category) {

            if (category) {
                req.flash("danger", "Category title exists, choose another.")
                return res.render("../../../includes/admin/views/media/categories/add_media_category", {
                    title: title
                });
            } else {

                let category = new Category({
                    title: title,
                    slug: slug
                });
                category.save(function (err) {
                    mkdirp("content/public/images/" + category.title, function (err) {
                        if (err) { console.log(err) }
                    })
                    if (err) { return console.log(err) };
                    Category.find(function (err, categories) {
                        if (err) {
                            console.log(err)
                        } else {
                            req.app.locals.mediacategories = categories;
                        }
                    })
                    req.flash("success", "Page added!");
                    res.redirect("/admin/media-categories");
                })
            }
        })
    }
})

/*
* GET edit media category
*/
router.get("/edit-media-category/:id",isAdmin, function (req, res) {
    Category.findById(req.params.id, function (err, category) {
        if (err) {
            return console.log(err)
        } else {
            res.render("../../../includes/admin/views/media/categories/edit_media_category", {
                title: category.title,
                id: category._id
            })
        }
    })
})

/*
* POST edit media category
*/
router.post("/edit-media-category/:id", function (req, res) {

    req.checkBody("title", "Title must have a value.").notEmpty();

    let title = req.body.title;
    let slug = title.replace(/\s+/g, "-").toLowerCase();
    let id = req.params.id;

    let errors = req.validationErrors();

    if (errors) {
        return res.render("../../../includes/admin/views/media/categories/edit_media_category", {
            errors: errors,
            title: title,
            id: id
        })
    } else {
        Category.findOne({ slug: slug, _id: { '$ne': id } }, function (err, category) {
            if (category) {
                req.flash("danger", "Category title exists, chooser another.")
                return res.render("../../../includes/admin/views/media/categories/edit_media_category", {
                    title: title,
                    id: id
                });
            } else {
                Category.findById(id, function (err, category) {
                    if (err) {
                        return console.log(err);
                    }
                    category.title = title;
                    category.slug = slug;

                    category.save(function (err) {
                        if (err) { return console.log(err) };
                        Category.find(function (err, categories) {
                            if (err) {
                                console.log(err)
                            } else {
                                req.app.locals.mediacategories = categories;
                            }
                        })
                        req.flash("success", "Page added!");
                        res.redirect("/admin/media-categories");
                    })

                })

            }
        })
    }
})

/*
* GET delete media category
*/
router.get("/delete-media-category/:id",isAdmin, function (req, res) {
    Category.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return console.log(err)
        }

        Category.find(function (err, categories) {
            if (err) {
                console.log(err)
            } else {
                req.app.locals.mediacategories = categories;
            }
        })
        req.flash("success", "Category deleted!")
        res.redirect("/admin/media-categories")

    })
})

//Exports
module.exports = router;