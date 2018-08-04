const express = require("express");
const router = express.Router();
const auth = require("../../AppStuff/authorization/auth");
const isAdmin = auth.isAdmin;
const request = require("request");
const fs = require("fs-extra");

/*
* GET Latest Update
*/
router.get("/", isAdmin, (req, res, next) => {
  request.get(
    "https://b5tx3g61ie.execute-api.us-east-2.amazonaws.com/default/AristosBasicUpdater",

    function(error, response, body) {
      if (error) {
        req.flash("error_msg", "There was an error with the Update!");
        //log error
        res.redirect("back");
        return console.error("upload failed:", error);
      }
      
      const content = JSON.parse(body);
      content.forEach(stuff => {
        fs.outputFile(stuff.name, stuff.content);
      });
    }
  );
  req.flash("success_msg", "System Updated!");
  res.redirect("back");
});

/* Exports */
module.exports = router;
        
        
        