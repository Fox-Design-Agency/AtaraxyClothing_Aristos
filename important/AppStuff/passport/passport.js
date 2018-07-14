const User = require("../../admin/adminModels/user");
const Logger = require("../../AristosStuff/AristosLogger/AristosLogger").Logger;
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
        Logger.error(err);
      }
      done(err, user);
    });
  });
};
