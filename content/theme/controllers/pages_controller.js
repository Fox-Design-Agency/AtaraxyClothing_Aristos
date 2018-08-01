// GET page model
const findPageWithParam = require("../../../important/admin/adminModels/queries/page/FindPageWithParam");
const createPage = require("../../../important/admin/adminModels/queries/page/CreatePage");
//GET media model
const findMediaWithParam = require("../../../important/admin/adminModels/queries/media/FindAllMediaWithParam");
const findAllMedia = require("../../../important/admin/adminModels/queries/media/FindAllMedia");

module.exports = {
  about(req, res, next) {
    const foundPage = findPageWithParam({ slug: "about" });
    const slider = findMediaWithParam({ category: "main_slider" });
    const teamMedia = findMediaWithParam({ category: "team" });
    Promise.all([foundPage, slider, teamMedia]).then(result => {
      if (result[0].length < 1) {
        res.redirect("/");
      } else {
        res.render(`${result[0][0].template}`, {
          title: result[0][0].title,
          content: result[0][0].content,
          keywords: result[0][0].keywords,
          description: result[0][0].description,
          author: result[0][0].author,
          media: result[1][0],
          team: result[2]
        });
      }
    });
  },
  home(req, res, next) {
    const homePage = findPageWithParam({ slug: "home" });
    const allMedia = findAllMedia();
    Promise.all([homePage, allMedia]).then(result => {
      if (result[0].length < 1) {
        createPage({
          title: "Home",
          slug: "home",
          content: "You should put stuff here and stuff.",
          parent: "home",
          description: "",
          keywords: "",
          author: ""
        }).then(page => {
          res.render("index", {
            title: page.title,
            content: page.content,
            keywords: page.keywords,
            description: page.description,
            author: page.author,
            media: media
          });
        });
      } else {
        res.render(`${result[0][0].template}`, {
          title: result[0][0].title,
          content: result[0][0].content,
          keywords: result[0][0].keywords,
          description: result[0][0].description,
          author: result[0][0].author,
          media: result[1]
        });
      }
    });
  },
  anyPage(req, res, next) {
    findPageWithParam({ slug: req.params.slug }).then(page => {
      if (page.length < 1) {
        res.redirect("/");
      } else {
        if (typeof page.template !== "undefined") {
          res.render(`${page.template}`, {
            title: page.title,
            content: page.content,
            keywords: page.keywords,
            description: page.description,
            author: page.author
          });
        } else {
          res.render("index", {
            title: page.title,
            content: page.content,
            keywords: page.keywords,
            description: page.description,
            author: page.author
          });
        }
      }
    });
  },
  contact(req, res, next) {
    findPageWithParam({ slug: "contact" }).then(page => {
      if (page.length < 1) {
        res.redirect("/");
      } else {
        res.render(`${page.template}`, {
          title: page.title,
          content: page.content,
          keywords: page.keywords,
          description: page.description,
          author: page.author
        });
      }
    });
  }
};
