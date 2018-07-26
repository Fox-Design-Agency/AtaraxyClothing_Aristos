const express = require("express");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const path = require("path");
const passport = require("passport");
/* needs more cleanup */
module.exports = app => {
  /* don't know if this should be a thing just yet */
  /* Set admin css folder */
  app.use(express.static(path.join(__dirname, "../../temp")));
  /* Set temp folder */
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../../content/public")));
  } else {
    app.use(express.static(path.join(__dirname, "../../../content/temp")));
  }
  /* Set public folder for images (should be removed) */
  app.use(
    express.static(path.join(__dirname, "../../../content/public/images/"))
  );
  /* need to set to dist for production */
  /* Express fileUpload middleware */
  app.use(fileUpload());
  /* end Express fileUpload middleware */
  /* Passport Config */
  require("../passport/passport")(passport);
  /* Passport Middleware */
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
};
