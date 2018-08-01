const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;

/* Media model queries */
const FindAllMedia = require("../../adminModels/queries/media/FindAllMedia");
/* User Model Queries */
const FindOneUserByID = require("../../adminModels/queries/user/FindOneUserWithID");
/* Template Model Queries */
const FindAllTemplates = require("../../adminModels/queries/templates/FindAllTemplates");
const CreateTemplate = require("../../adminModels/queries/templates/CreateTemplate");
const FindTemplateWithParam = require("../../adminModels/queries/templates/FindTemplateWithParam");
const FindOneTemplate = require("../../adminModels/queries/templates/FindOneTemplatebyID");
const EditTemplate = require("../../adminModels/queries/templates/EditTemplate");
const DeleteTemplate = require("../../adminModels/queries/templates/DeleteTemplate");

module.exports = {
  index(req, res, next) {
    FindAllTemplates().then(templates => {
      res.render(
        "../../../important/admin/views/templateBuilder/templateDashboard",
        {
          content: "",
          title: "",
          author: "",
          keywords: "",
          templates: templates
        }
      );
    });
  } /* end of template index function */,

  addIndex(req, res, next) {
    res.render(
      "../../../important/admin/views/templateBuilder/addBasicTemplate",
      {
        content: "",
        title: "",
        author: "",
        description: "",
        path: ""
      }
    );
  } /* end of template add index function */,

  basicCreate(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Please add a title." });
        }
        if (!req.body.path) {
          errors.push({ text: "Please add a path." });
        }

        let title = req.body.title;
        let content = req.body.content;
        let viewPath = req.body.path;
        let description = req.body.description;
        let author = req.body.author;

        if (errors.length > 0) {
          return res.render(
            "../../../important/admin/views/templateBuilder/addBasicTemplate",
            {
              errors: errors,
              title: title,
              path: viewPath,
              content: content,
              description: description,
              author: author
            }
          );
        } else {
          CreateTemplate({
            title: title,
            path: viewPath,
            content: content,
            author: author,
            description: description
          }).then(() => {
            FindAllTemplates().then(templates => {
              req.flash("success_msg", "Template added!");
              res.redirect("/admin/template-builder");
            });
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of template basic create function */,

  editIndex(req, res, next) {
    FindOneTemplate(req.params.id).then(template => {
      console.log(template.description);
      res.render(
        "../../../important/admin/views/templateBuilder/editBasicTemplate",
        {
          content: template.content,
          title: template.title,
          author: template.author,
          path: template.path,
          description: template.description,
          id: template._id
        }
      );
    });
  } /* end of edit index function */,

  basicUpdate(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Please add a title." });
        }
        if (!req.body.path) {
          errors.push({ text: "Please add a path." });
        }

        let title = req.body.title;
        let content = req.body.content;
        let viewPath = req.body.path;
        let description = req.body.description;
        let author = req.body.author;
        let id = req.params.id;

        if (errors.length > 0) {
          return res.render(
            "../../../important/admin/views/templateBuilder/addBasicTemplate",
            {
              errors: errors,
              title: title,
              path: viewPath,
              content: content,
              description: description,
              author: author
            }
          );
        } else {
          const templateProps = {
            title: title,
            content: content,
            path: viewPath,
            description: description,
            author: author
          };
          EditTemplate(id, templateProps);
          FindAllTemplates().then(templates => {
            req.flash("success_msg", "Template updated!");
            res.redirect("/admin/template-builder");
          });
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of basic update function */,

  basicDelete(req, res, next) {
    DeleteTemplate(req.params.id).then(() => {
      FindAllTemplates().then(templates => {
        req.flash("success_msg", "Template deleted!");
        res.redirect("/admin/template-builder");
      });
    });
  } /* end of basic delete */
};
