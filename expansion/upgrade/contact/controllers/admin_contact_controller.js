const errorAddEvent = require("../../../../important/AristosStuff/AristosLogger/AristosLogger")
  .addError;

/* contact Message Queries */
const CountContactMessage = require("../models/queries/CountMessages");
const CreateContactMessage = require("../models/queries/CreateMessage");
const DeleteContactMessage = require("../models/queries/DeleteMessage");
const GetAllMessages = require("../models/queries/FindAllMessages");
/* User Model Queries */
// const FindOneUserByID = require("../../../../important/adminModels/queries/user/FindOneUserWithID");
module.exports = {
  index(req, res, next) {
    Promise.all([CountContactMessage(), GetAllMessages()]).then(result=>{
      res.render("../../../expansion/upgrade/contact/views/contact",
      {
        messages: result[1],
        count: result[0]
      });
    })
    
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
      res.redirect("back");
    }
  } /* end of create function */,

  delete(req, res, next){
    DeleteContactMessage(req.params.id)
    req.flash("success_msg", "Message Deleted!");
      res.redirect("back");

  }/* end of delete function */
};
