const express = require("express");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const path = require("path");
const passport = require("passport");
/* needs more cleanup */
module.exports = app => {
  /* Set admin css folder */
  if (process.env.NODE_ENV === "production") {
    app.use(
      express.static(path.join(__dirname, "../../../dist/content/public"))
    );
  } else {
    app.use(express.static(path.join(__dirname, "../../../content/public")));
  }
  /* Express fileUpload middleware */
  app.use(fileUpload());
  /* end Express fileUpload middleware */
  /* Passport Config */
  require("../passport/passport")(passport);
  /* Passport Middleware */
  /* Start of express sessions */
  require("./session/expressSession")(app);
  /* end of express sessions */
  app.use(passport.initialize());
  app.use(passport.session());
  /* end Passport Config */
  /* method override middleware */
  app.use(methodOverride("_method"));
  /* flash middleware */
  app.use(flash());
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    res.locals.errors = [];
    next();
  });
  require("./siteStats/siteStats")(app);
  require("./siteStats/frontEndStats")(app);
};