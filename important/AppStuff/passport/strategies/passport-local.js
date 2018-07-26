const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
/* user queries */
const findOneUserWithParam = require("../../../admin/adminModels/queries/user/FindUserWithParam");
/* logger calls */
const addInfoLog = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .addInfo;
const addErrorLog = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
module.exports = function(passport) {
  passport.use(
    new localStrategy(function(username, password, done) {
      findOneUserWithParam({ username: username }).then(user => {
        if (user.length < 1) {
          return done(null, false, { message: "No user found" });
        }
        bcrypt.compare(password, user[0].password, function(err, isMatch) {
          if (err) {
            addErrorLog(err, "user hash compare error");
          }
          if (isMatch) {
            addInfoLog(user[0].username + " has Logged in!", "user login info");
            return done(null, user[0]);
          } else {
            return done(null, false, { message: "Wrong password." });
          }
        });
      });
    })
  );
};
