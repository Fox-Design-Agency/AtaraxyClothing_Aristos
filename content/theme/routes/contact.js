const express = require("express");
const router = express.Router();

// GET page model
const findPageWithParam = require("../../../important/admin/adminModels/queries/page/FindPageWithParam");

/*
* GET blog index
*/

router.get("/", function(req, res) {
  findPageWithParam({ slug: "contact" }).then(page => {
    if (!page) {
      res.redirect("/");
    } else {
      res.render("contact", {
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
