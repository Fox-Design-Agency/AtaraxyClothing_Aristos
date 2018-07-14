const express = require("express");
const router = express.Router();
// GET page model
const createPage = require("../../../important/admin/adminModels/queries/page/CreatePage");
const findPageWithParams = require("../../../important/admin/adminModels/queries/page/FindPageWithParam");

//GET media model
const findAllMedia = require("../../../important/admin/adminModels/queries/media/FindAllMedia");

//productcats
const findAllSortedProductCategories = require("../../../expansion/upgrade/products/models/queries/productCategory/FindAllSortedProductCategories");

/*
* GET /
*/

router.get("/", function(req, res) {
  findPageWithParams({ slug: "home" }).then(page => {
    if (!page) {
      createPage({
        title: "Home",
        slug: "home",
        content: "You should put stuff here and stuff.",
        parent: "home",
        description: "",
        keywords: "",
        author: ""
      }).then(page => {
        findAllMedia().then(media => {
          res.render("index", {
            title: page.title,
            content: page.content,
            keywords: page.keywords,
            description: page.description,
            author: page.author,
            media: media
          });
        });
      });
    } else {
      findAllMedia().then(media => {
        res.render("index", {
          title: page.title,
          content: page.content,
          keywords: page.keywords,
          description: page.description,
          author: page.author,
          media: media
        });
      });
    }
  });
});

/*
* GET a page
*/

router.get("/:slug", function(req, res) {
  findPageWithParams({ slug: req.params.slug }).then(page => {
    if (page.length < 1) {
      res.redirect("/");
    } else {
      res.render("index", {
        title: page.title,
        content: page.content,
        keywords: page.keywords,
        description: page.description,
        author: page.author
      });
    }
  });
});

//Exports
module.exports = router;
