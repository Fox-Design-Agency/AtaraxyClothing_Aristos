const passport = require("passport");
/* media query */
const AllMedia = require("../../../important/admin/adminModels/queries/media/FindAllMedia");

module.exports = {
  register(req, res, next) {
    AllMedia().then(media => {
      res.render("user/register", {
        title: "Register",
        author: "",
        description: "",
        keywords: "",
        name: "",
        username: "",
        email: "",
        media: media
      });
    });
  }, // end of register function

  login(req, res, next) {
    if (res.locals.user) {
      res.redirect("/");
    } else {
      AllMedia().then(media => {
        res.render("user/login", {
          title: "Log in",
          author: "",
          description: "",
          keywords: "",
          media: media
        });
      });
    }
  }, // end of login function

  processLogin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/user/login",
      failureFlash: true
    })(req, res, next);
  }, // end of process login function

  logout(req, res, next) {
    req.logout();
    req.flash("success_msg", "You are logged out!");
    res.redirect("/users/login");
  } //end of logout function
};
