const passport = require("passport");
const bcrypt = require("bcryptjs");
const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger").addError;
/* User model Queries */
const FindUserWithParam = require("../../adminModels/queries/user/FindUserWithParam");
const CreateUser = require("../../adminModels/queries/user/CreateUser");
const FindOneUserByID = require("../../adminModels/queries/user/FindOneUserWithID");
const EditUser = require("../../adminModels/queries/user/EditUser");
const DeleteUser = require("../../adminModels/queries/user/DeleteUser");

module.exports = {
  index(req, res, next) {
    FindUserWithParam({ admin: 1 }).then(users => {
      res.render("../../../important/admin/views/users/users", {
        users: users
      });
    });
  } /* end of index function */,
  /* this one needs work?? */
  addIndex(req, res, next) {
    let title = "";
    res.render("../../../important/admin/views/users/add_users", {
      content: "",
      title: title
    });
  } /* end of add index function */,
  createUser(req, res, next) {
    let errors = [];
    if (!req.body.name) {
      errors.push({ text: "Please add a title." });
    }
    if (!req.body.email) {
      errors.push({ text: "Email is required." });
    }
    if (!req.body.username) {
      errors.push({ text: "Username is required." });
    }
    if (!req.body.password || !req.body.password2) {
      errors.push({ text: "Password is required." });
    }
    if (req.body.password.length < 4) {
      errors.push({ text: "Password must be at least 4 characters" });
    }
    if (req.body.password != req.body.password2) {
      errors.push({ text: "Passwords do not match." });
    }

    if (errors.length > 0) {
      res.render("register", {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        errors: errors,
        title: "Register",
        author: "",
        description: "",
        keywords: ""
      });
    } else {
      FindUserWithParam({ username: req.body.username }).then(user => {
        if (user.length > 0) {
          errors.push({ text: "Username exists, choose another!" });
          res.render("register", {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            errors: errors,
            title: "Register",
            author: "",
            description: "",
            keywords: ""
          });
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) {
                addErrorEvent(err, "user create error");
              }
              const UserProps = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hash
              };
              CreateUser(UserProps);
              req.flash("success_msg", "You are now registered!");
              res.redirect("/users/login");
            });
          });
        }
      });
    }
  } /* end of create user */,
  createAdmin(req, res, next) {
    const User = FindOneUserByID(req.session.passport.user);
    User.then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.name) {
          errors.push({ text: "Please add a title." });
        }
        if (!req.body.email) {
          errors.push({ text: "Email is required." });
        }
        if (!req.body.username) {
          errors.push({ text: "Username is required." });
        }
        if (!req.body.password || !req.body.password2) {
          errors.push({ text: "Password is required." });
        }
        if (req.body.password.length < 4) {
          errors.push({ text: "Password must be at least 4 characters" });
        }
        if (req.body.password != req.body.password2) {
          errors.push({ text: "Passwords do not match." });
        }
        let admin = "";
        if (req.body.admin == "yes") {
          admin = 1;
        } else {
          admin = 0;
        }

        if (errors.length > 0) {
          res.render("../../../important/admin/views/users/add_users", {
            errors: errors,
            user: null
          });
        } else {
          FindUserWithParam({ username: req.body.username }).then(user => {
            if (user.length > 0) {
              req.flash("error_msg", "Username exists, choose another!");
              res.redirect("/admin/user-controls/add-users");
            } else {
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                  if (err) {
                    addErrorEvent(err, "user create admin error");
                  }
                  const UserProps = {
                    name: name,
                    email: email,
                    username: username,
                    password: hash,
                    admin: admin
                  };
                  CreateUser(UserProps);
                  req.flash("success_msg", "Admin is now registered!");
                  res.redirect("/admin/user-controls");
                });
              });
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,

  editIndex(req, res, next) {
    // change to query
    FindOneUserByID(req.params.id).then(user => {
      res.render("../../../important/admin/views/users/edit_users", {
        content: "",
        user: user,
        id: user._id
      });
    });
  } /* end of edit index function */,

  saveEdit(req, res, next) {
    // still needs work
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let name = req.body.name;
        let username = req.body.username;
        let id = req.params.id;
        let admin = "";
        if (req.body.admin === "yes") {
          admin = 1;
        } else {
          admin = 0;
        }
        let errors = [];
        if (!req.body.name) {
          errors.push({ text: "Please add a title." });
        }
        if (!req.body.email) {
          errors.push({ text: "Email is required." });
        }
        if (!req.body.username) {
          errors.push({ text: "Username is required." });
        }
        if (errors.length > 0) {
          res.render("../../../includes/admin/views/users/edit_users", {
            errors: errors,
            user: null
          });
        } else {
          FindUserWithParam({ username: username }).then(user => {
            if (user.length > 0) {
              req.flash("error_msg", "Username exists, choose another!");
              res.redirect("/admin/user-controls/edit-admin/" + id);
            } else {
              const userProps = {
                username: username,
                name: name,
                admin: admin
              };
              EditUser(id, userProps);
              req.flash("success_msg", "You are now registered!");
              res.redirect("/admin/user-controls");
            }
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of save edit function */,

  remove(req, res, next) {
    DeleteUser(req.params.id);
    req.flash("success_msg", "Admin removed!");
    res.redirect("/admin/user-controls");
  } /* end of remove function */
};
