const express = require("express")
const router = express.Router();
const mkdirp = require("mkdirp");
const fs = require("fs-extra");
const resizeImg = require("resize-img");
const auth = require("../../../config/auth")
const isAdmin = auth.isAdmin;

// GET blog model
const Media = require("../../../models/media")

// GET Media Category model
const MediaCategory = require("../../../models/mediaCategory")

/*
* GET add media index
*/
router.get("/",isAdmin, function (req, res) {

    MediaCategory.find(function (err, categories) {
        Media.find(function (err, media) {
            res.render("../../../includes/admin/views/media/media", {
                content: "",
                categories: categories,
                media: media
            })
        })
    })
})

/*
* POST add media
*/
router.post("/", function (req, res) {
    console.log(req.locals.user)
    let newMedia = req.files.file;
    let path = "General/" + req.files.file.name;
    mkdirp("content/public/images/General", function (err) {
        if (err) { console.log(err) }
    })
    newMedia.mv("content/public/images/" + path, function (err) {
        if (err) {
            console.log(err);
        }
    })
    let media = new Media({
        title: "a new image",
        alt: "a new image",
        category: "General",
        path: path
    });
    media.save(function (err) {
        if (err) { return console.log(err) };
    })
    res.sendStatus(200);

})


/*
* GET upload Image
*/
router.get("/upload-image", isAdmin,function (req, res) {
    let title = "";
    let alt = "";
    let link = "";
    let description = "";
    let keywords = "";
    MediaCategory.find(function (err, categories) {
        res.render("../../../includes/admin/views/media/add_image", {
            title: title,
            alt: alt,
            categories: categories,
            link: link,
            description: description,
            keywords: keywords
        })
    })
})

/*
* POST upload image
*/
router.post("/upload-image", function (req, res) {
    let imageFile = typeof req.files.image !== "undefined" ? req.files.image.name : "";
    req.checkBody("title", "Title must have a value.").notEmpty();
    req.checkBody("alt", "Alt Tag must have a value.").notEmpty();
    req.checkBody("image", "You must upload an image.").isImage(imageFile);

    let title = req.body.title;
    let alt = req.body.alt;
    let category = req.body.category
    let path = category + "/" + imageFile
    let description = req.body.description;
    let keywords = req.body.keywords;
    let link = req.body.link;

    let errors = req.validationErrors();

    if (errors) {
        MediaCategory.find(function (err, categories) {
            res.render("../../../includes/admin/views/media/add_image", {
                errors: errors,
                title: title,
                alt: alt,
                categories: categories,
                link: link,
                description: description,
                keywords: keywords

            })
        })
    } else {
        mkdirp("content/public/images/" + category, function (err) {
            if (err) { console.log(err) }
        })
        // mkdirp("content/public/images/" + category + "/" + title, function (err) {
        //     if (err) { console.log(err) }
        // })
        if (imageFile !== "") {
            let newMedia = req.files.image;
            newMedia.mv("content/public/images/" + path, function (err) {
                if (err) { console.log(err) }
            })
        }
        let media = new Media({
            title: title,
            alt: alt,
            category: category,
            path: path,
            link: link,
            description: description,
            keywords: keywords
        });
        media.save(function (err) {
            if (err) { return console.log(err) };



            req.flash("success", "Media added!");
            res.redirect("/admin/add-media");
        })
    }
})

/*
* GET edit image
*/
router.get("/edit-image/:id",isAdmin, function (req, res) {
    MediaCategory.find(function (err, categories) {
        Media.findById(req.params.id, function (err, media) {
            res.render("../../../includes/admin/views/media/edit_image", {
                content: "",
                title: media.title,
                alt: media.alt,
                categories: categories,
                path: media.path,
                id: media._id,
                link: media.link,
                description: media.description,
                keywords: media.keywords,
                selectedCat: media.category
            })
        })
    })
})

/*
* POST edit image
*/
router.post("/edit-image/:id", function (req, res) {
    req.checkBody("title", "Title must have a value.").notEmpty();
    req.checkBody("alt", "Alt Tag must have a value.").notEmpty();

    let title = req.body.title;
    let alt = req.body.alt;
    let category = req.body.category;
    let id = req.params.id;
    let errors = req.validationErrors();
    let description = req.body.description;
    let keywords = req.body.keywords;
    let link = req.body.link;

    if (errors) {
        req.session.error = errors;
        res.redirect("/admin/views/media/edit-media/" + id);
    } else {
        // need to move file if title is changed

        // mkdirp("content/public/images/" + category, function (err) {
        //     if (err) { console.log(err) }
        // })
        // mkdirp("content/public/images/" + category + "/" + title, function (err) {
        //     if (err) { console.log(err) }
        // })
        // if (imageFile !== "") {
        //     let newMedia = req.files.image;
        //     newMedia.mv("content/public/images/" + path, function (err) {
        //         if (err) { console.log(err) }
        //     })
        // }
        Media.findById(id, function (err, media) {
            if (err) {
                console.log(err)
            }
            media.title = title;
            media.alt = alt;
            media.category = category;
            media.link = link;
            media.description = description;
            media.keywords = keywords;
            
            media.save(function (err) {
                if (err) {
                    console.log(err)
                }

                req.flash("success", "Media updated!");
                res.redirect("/admin/add-media");
            })
        })
    }
})

/*
* GET delete image
*/
router.get("/delete-image/:id",isAdmin, function (req, res) {
    let id = req.params.id

    Media.findById(id, function (err, media) {
        if (err) {
            return console.log(err)
        }
        let path = "content/public/images/" + media.path
        fs.remove(path, function (err) {
            if (err) {
                console.log(err)
            } else {
                Media.findByIdAndRemove(id, function (err, media) {
                    if (err) {
                        return console.log(err)
                    }

                })
                req.flash("success", "Image deleted!")
                res.redirect("/admin/add-media")
            }
        })
    })

})
/*
* GET delete image
*/
router.get("/trash-delete-image/:id", isAdmin,function (req, res) {
    let id = req.params.id

    Media.findById(id, function (err, media) {
        if (err) {
            return console.log(err)
        }
        let path = "content/public/images/" + media.path
        fs.remove(path, function (err) {
            if (err) {
                console.log(err)
            } else {
                Media.findByIdAndRemove(id, function (err, media) {
                    if (err) {
                        return console.log(err)
                    }

                })
                req.flash("success", "Image deleted!")
                res.redirect("/admin/add-media")
            }
        })
    })

})
/*
* GET upload video
*/
router.get("/upload-video",isAdmin, function (req, res) {
    let title = "";
    let alt = ""
    MediaCategory.find(function (err, categories) {
        res.render("../../../includes/admin/views/media/add_image", {
            title: title,
            alt: alt,
            categories: categories
        })
    })
})

/*
* POST upload video
*/
router.post("/upload-video/:id", function (req, res) {

})


/*
* GET edit video
*/
router.get("/edit-video/:id",isAdmin, function (req, res) {
    res.render("../../../includes/admin/views/media/edit_video", {
        content: ""
    })
})

/*
* GET delete video
*/
router.get("/delete-video/:video",isAdmin, function (req, res) {
    let originalImage = "public/product_images/" + req.query.id + "/gallery/" + req.params.image;
    let thumbsImage = "public/product_images/" + req.query.id + "/gallery/thumbs/" + req.params.image;

    fs.remove(originalImage, function (err) {
        if (err) {
            console.log(err)
        } else {
            fs.remove(thumbsImage, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    req.flash("success", "Image deleted!");
                    res.redirect("/admin/products/edit-products/" + req.query.id)
                }
            })
        }
    })

})

//Exports
module.exports = router;