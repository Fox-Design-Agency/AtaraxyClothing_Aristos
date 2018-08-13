const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/* contact Message Queries */
const CreateContactMessage = require("../models/queries/CreateMessage");
/* User Model Queries */
// const FindOneUserByID = require("../../../../important/adminModels/queries/user/FindOneUserWithID");
module.exports = {
  index(req, res, next) {
    res.render("../../../expansion/upgrade/contact/views/contact"),
      {
        title: "tile",
        slug: "slug",
        content: "content",
        author: "author",
        description: "description",
        keywords: "keywords"
      };
  } /* end of index function */,

  create(req, res, next) {
    let errors = [];
    if(!req.body.name){
      errors.push({text: "Namme must have a value."})
    }
    if(!req.body.content){
      errors.push({text: "content must have a value."})
    }
    if(!req.body.subject){
      errors.push({text: "Subject must have a value."})
    }
    if(!req.body.email){
      errors.push({text: "email must have a value."})
    }

    let content = req.body.content;
    let email = req.body.email;
    let subject = req.body.subject;
    let name = req.body.name;

    if (errors.length > 0) {
      /* ?????? */
      req.session.error = errors;
      res.redirect("/contact");
    } else {
      const messageParams = {
        name: name,
        subject: subject,
        content: content,
        email: email
      };
      CreateContactMessage(messageParams);

      req.flash("success_msg", "Message sent!");
      res.redirect("/contact");
    }
  } /* end of create function */
};
