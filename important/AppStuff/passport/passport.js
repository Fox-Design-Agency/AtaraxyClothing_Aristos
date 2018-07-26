const User = require("../../admin/adminModels/user");
const addErrorLog = require("../../AristosStuff/AristosLogger/AristosLogger").addError;
/* User Queries */

module.exports = function(passport) {
  /* start passport local strategy */
  require("./strategies/passport-local")(passport);
  /* end passport local strategy */
  /* start passport google strategy */
  //require("./strategies/passport-google")(passport);
  /* end passport google strategy */
  /* start passport facebook strategy */
  //require("./strategies/passport-facebook")(passport);
  /* end passport facebook strategy */

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      if (err) {
        addErrorLog(err, "deserialize error");
      }
      done(err, user);
    });
  });
};
