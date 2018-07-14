const express = require("express");
const router = express.Router();

// GET page model
const findPageWithParam = require("../../../important/admin/adminModels/queries/page/FindPageWithParam");
//GET media model
const findMediaWithParam = require("../../../important/admin/adminModels/queries/media/FindAllMediaWithParam");

/*
* GET blog index
*/

router.get("/", function(req, res) {
  const foundPage = findPageWithParam({ slug: "about" });
  const slider = findMediaWithParam({ category: "main_slider" });
  const teamMedia = findMediaWithParam({ category: "team" });
  Promise.all([foundPage, slider, teamMedia]).then(result => {
    if (!result[0]) {
      res.redirect("/");
    } else {
      res.render("about_us", {
        title: result[0].title,
        content: result[0].content,
        keywords: result[0].keywords,
        description: result[0].description,
        author: result[0].author,
        media: result[1],
        team: result[2]
      });
    }
  });
});

//Exports
module.exports = router;
