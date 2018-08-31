const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
const fs = require("fs-extra");

/* Media Model Queries */
const FindAllMedia = require("../../adminModels/queries/media/FindAllMedia");
const CreateMedia = require("../../adminModels/queries/media/CreateMedia");
const FindMediaByID = require("../../adminModels/queries/media/FindMediaByID");
const EditMedia = require("../../adminModels/queries/media/EditMedia");
const DeleteMedia = require("../../adminModels/queries/media/DeleteMedia");

/* Media Category Model Queries */
const FindAllMediaCategories = require("../../adminModels/queries/mediaCategories/FindAllMediaCategories");
const FindMediaCategoryByParem = require("../../adminModels/queries/mediaCategories/FindMediaCategoryByParam");
/* User Model Queries */
const FindOneUserByID = require("../../adminModels/queries/user/FindOneUserWithID");

module.exports = {
  index(req, res, next) {
    Promise.all([FindAllMediaCategories(), FindAllMedia()]).then(result => {
      res.render("../../../important/admin/views/media/media", {
        categories: result[0],
        media: result[1]
      });
    });
  } /* end of index function */,

  upload(req, res, next) {
    let title,
      alt,
      link,
      description,
      keywords = "";
    FindAllMediaCategories().then(categories => {
      res.render("../../../important/admin/views/media/add_image", {
        title: title,
        alt: alt,
        categories: categories,
        link: link,
        description: description,
        keywords: keywords
      });
    });
  } /* end of upload get function */,
  create(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let newMedia = req.files.file;
        let path = "/images/General/" + req.files.file.name;
        fs.ensureDir("content/public/images/General", err => {
          if (err) {
            addErrorEvent(err, "media create error");
          }
        });
        newMedia.mv("content/public" + path, err => {
          if (err) {
            addErrorEvent(err, "media create error");
          }
        });
        FindMediaCategoryByParem({ title: "General" }).then(general => {
          const mediaProps = {
            title: "a new image",
            alt: "a new image",
            category: general[0]._id,
            path: path
          };
          CreateMedia(mediaProps);
          req.flash("success_msg", "Media added!");
          res.redirect("/admin/add-media");
        });
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,
  uploadCreate(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let imageFile =
          typeof req.files.image !== "undefined" ? req.files.image.name : "";
        let errors = [];

        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }
        if (!req.body.alt) {
          errors.push({ text: "Alt Tag must have a value." });
        }
        if (!imageFile) {
          errors.push({ text: "You must upload an image." });
        }

        let title = req.body.title;
        let alt = req.body.alt;
        let category = req.body.category;
        let categoryTitle;
        FindAllMediaCategories().then(cats => {
          cats.forEach(cat => {
            if (cat._id == category) {
              categoryTitle = cat.title;
            }
          });
          let path = "/images/" + categoryTitle + "/" + imageFile;
          let description = req.body.description;
          let keywords = req.body.keywords;
          let link = req.body.link;

          if (errors.length > 0) {
            res.render("../../../important/admin/views/media/add_image", {
              errors: errors,
              title: title,
              alt: alt,
              categories: cats,
              link: link,
              description: description,
              keywords: keywords
            });
          } else {
            fs.ensureDir("content/public/images/" + categoryTitle, err => {
              if (err) {
                addErrorEvent(err, "media uploadCreate error");
              }
            });
            if (imageFile !== "") {
              let newMedia = req.files.image;
              newMedia.mv("content/public" + path, err => {
                if (err) {
                  addErrorEvent(err, "media uploadCreate error");
                }
              });
            }
            const mediaProps = {
              title: title,
              alt: alt,
              category: category,
              path: path,
              link: link,
              description: description,
              keywords: keywords
            };
            CreateMedia(mediaProps);
            req.flash("success_msg", "Media added!");
            res.redirect("/admin/add-media");
          }
        });
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of upload create function */,

  edit(req, res, next) {
    Promise.all([FindAllMediaCategories(), FindMediaByID(req.params.id)]).then(
      result => {
        res.render("../../../important/admin/views/media/edit_image", {
          content: "",
          title: result[1].title,
          alt: result[1].alt,
          categories: result[0],
          path: result[1].path,
          id: result[1]._id,
          link: result[1].link,
          description: result[1].description,
          keywords: result[1].keywords,
          selectedCat: result[1].category
        });
      }
    );
  } /* end of get edit function */,

  saveEdit(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let errors = [];

        if (!req.body.title) {
          errors.push({ text: "Title must have a value." });
        }
        if (!req.body.alt) {
          errors.push({ text: "Alt Tag must have a value." });
        }
        let title = req.body.title;
        let alt = req.body.alt;
        let category = req.body.category;
        let id = req.params.id;
        let description = req.body.description;
        let keywords = req.body.keywords;
        let link = req.body.link;

        if (errors.length > 0) {
          const cats = FindAllMediaCategories();
          const thisMedia = FindMediaByID(id);
          Promise.all([cats, thisMedia]).then(result => {
            res.render("../../../important/admin/views/media/edit_image", {
              errors: errors,
              title: title,
              alt: alt,
              id: id,
              categories: result[0],
              link: link,
              description: description,
              keywords: keywords,
              selectedCat: category,
              path: result[1].path
            });
          });
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
          const mediaProps = {
            title: title,
            alt: alt,
            category: category,
            link: link,
            description: description,
            keywords: keywords
          };
          EditMedia(id, mediaProps);
          req.flash("success_msg", "Media updated!");
          res.redirect("/admin/add-media");
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of post edit function */,

  delete(req, res, next) {
    let id = req.params.id;
    FindMediaByID(id).then(media => {
      let path = "content/public" + media.path;
      fs.remove(path, err => {
        if (err) {
          addErrorEvent(err, "media delete error");
        } else {
          DeleteMedia(id);
          req.flash("success_msg", "Image deleted!");
          res.redirect("/admin/add-media");
        }
      });
    });
  } /* end of delete function */,

  trashDelete(req, res, next) {
    let id = req.params.id;
    FindMediaByID(id).then(media => {
      let path = "content/public" + media.path;
      fs.remove(path, function(err) {
        if (err) {
          addErrorEvent(err, "media trash delete error");
        } else {
          DeleteMedia(id);
          req.flash("success_msg", "Image deleted!");
          res.redirect("/admin/add-media");
        }
      });
    });
  } /* end of trash delete function */
};