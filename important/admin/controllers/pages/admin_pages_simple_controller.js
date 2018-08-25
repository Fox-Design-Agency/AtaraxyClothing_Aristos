const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger")
  .addError;
/* Page model queries */
const CountPages = require("../../adminModels/queries/page/CountPages");
const CreatePage = require("../../adminModels/queries/page/CreatePage");
const EditPage = require("../../adminModels/queries/page/EditPage");
const FindAllSortedPages = require("../../adminModels/queries/page/FindAllSortedPages");
const FindOnePage = require("../../adminModels/queries/page/FindOnePagebyID");
const DeletePage = require("../../adminModels/queries/page/DeletePage");
const SortPagesByID = require("../../adminModels/queries/page/SortPagesByID");
const FindPageWithParam = require("../../adminModels/queries/page/FindPageWithParam");

/* Media model queries */
const FindAllMedia = require("../../adminModels/queries/media/FindAllMedia");

/* User Model Queries */
const FindOneUserByID = require("../../adminModels/queries/user/FindOneUserWithID");
/* Template Model Queries */
const FindAllTemplates = require("../../adminModels/queries/templates/FindAllTemplates");

module.exports = {
  index(req, res, next) {
    Promise.all([FindAllSortedPages(), CountPages()]).then(result => {
      res.render("../../../important/admin/views/pages/pages", {
        pages: result[0],
        count: result[1]
      });
    });
  } /* end of index function */,

  addIndex(req, res, next) {
    let title,
      slug,
      content,
      parent,
      description,
      keywords,
      author = "";

    Promise.all([FindAllTemplates(), FindAllMedia()]).then(results => {
      res.render("../../../important/admin/views/pages/add_page", {
        title: title,
        slug: slug,
        content: content,
        parent: parent,
        media: results[1],
        description: description,
        keywords: keywords,
        author: author,
        templates: results[0]
      });
    });
  } /* end of add index function */,
  create(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Please add a title." });
        }
        if (!req.body.content) {
          errors.push({ text: "Please add content." });
        }

        let title = req.body.title;
        let slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
        if (slug == "") {
          slug = title.replace(/\s+/g, "-").toLowerCase();
        }
        let content = req.body.content;
        let parent = req.body.parent;
        let description = req.body.description;
        let keywords = req.body.keywords;
        let author = req.body.author;
        if (parent == "") {
          parent = "home";
        }
        let template = req.body.template;
        if (errors.length > 0) {
          FindAllMedia().then(media => {
            return res.render("../../../important/admin/views/pages/add_page", {
              errors: errors,
              media: media,
              title: title,
              slug: slug,
              parent: parent,
              content: content,
              description: description,
              keywords: keywords,
              author: author
            });
          });
        } else {
          FindPageWithParam({ slug: slug }).then(curPageRes => {
            if (curPageRes.length > 0) {
              FindAllMedia().then(media => {
                let errors = [{ text: "Page slug exists, choose another." }];
                return res.render(
                  "../../../important/admin/views/pages/add_page",
                  {
                    errors: errors,
                    title: title,
                    media: media,
                    slug: "",
                    content: content,
                    parent: parent,
                    description: description,
                    keywords: keywords,
                    author: author
                  } /* end of return render */
                );
              });
            } else {
              CreatePage({
                title: title,
                slug: slug,
                content: content,
                parent: parent,
                sorting: 100,
                description: description,
                keywords: keywords,
                author: author,
                template: template
              }).then(() => {
                FindAllSortedPages().then(sortedRes => {
                  req.app.locals.pages = sortedRes;
                  req.flash("success_msg", "Page added!");
                  res.redirect("/admin/pages");
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

  reorder(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let ids = req.body["id[]"];
        SortPagesByID(ids);
        FindAllSortedPages().then(sortedRes => {
          req.app.locals.pages = sortedRes;
          res.redirect("/admin/pages");
        });
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of reorder function */,

  editIndex(req, res, next) {
    Promise.all([
      FindOnePage(req.params.id),
      FindAllMedia(),
      FindAllTemplates()
    ]).then(result => {
      res.render("../../../important/admin/views/pages/edit_page", {
        title: result[0].title,
        slug: result[0].slug,
        content: result[0].content,
        parent: result[0].parent,
        id: result[0]._id,
        media: result[1],
        description: result[0].description,
        keywords: result[0].keywords,
        author: result[0].author,
        selectedCat: result[0].parent,
        selectedTemplate: result[0].template.title,
        templates: result[2]
      }); /* end of res render */
    }); /* Promise all */
  } /* end of edit index function */,

  saveEdit(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let errors = [];
        if (!req.body.title) {
          errors.push({ text: "Please add a title." });
        }
        if (!req.body.content) {
          errors.push({ text: "Please add content." });
        }
        let title = req.body.title;
        let slug = req.body.slug.replace(/\s+/g, "-").toLowerCase();
        if (slug == "") {
          slug = title.replace(/\s+/g, "-").toLowerCase();
        }
        let parent = req.body.parent;
        if (parent == "") {
          parent = "home";
        }
        let content = req.body.content;
        let keywords = req.body.keywords;
        let author = req.body.author;
        let description = req.body.description;
        let id = req.params.id;
        let template = req.body.template;

        if (errors.length > 0) {
          FindAllMedia().then(media => {
            return res.render(
              "../../../important/admin/views/pages/edit_page",
              {
                errors: errors,
                title: title,
                slug: slug,
                content: content,
                parent: parent,
                media: media,
                keywords: keywords,
                description: description,
                author: author,
                id: id,
                selectedCat: parent,
                template: template
              }
            );
          }); /* end of medias promise */
        } else {
          FindPageWithParam({ slug: slug, _id: { $ne: id } }).then(
            curPageRes => {
              if (curPageRes.length > 0) {
                FindAllMedia().then(media => {
                  let errors = [{ text: "Page slug exists, choose another." }];
                  return res.render(
                    "../../../important/admin/views/pages/edit_page",
                    {
                      errors: errors,
                      title: title,
                      slug: "",
                      content: content,
                      parent: parent,
                      id: id,
                      media: media,
                      keywords: keywords,
                      author: author,
                      description: description,
                      selectedCat: parent,
                      template: template
                    }
                  );
                });
              } else {
                const PageProps = {
                  title: title,
                  slug: slug,
                  content: content,
                  parent: parent,
                  description: description,
                  keywords: keywords,
                  author: author,
                  template: template
                };
                EditPage(id, PageProps);
                FindAllSortedPages().then(sortedRes => {
                  req.app.locals.pages = sortedRes;
                  req.flash("success_msg", "Page edited!");
                  res.redirect("/admin/pages");
                });
              }
            }
          );
        }
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of save edit function */,

  delete(req, res, next) {
    //remove all child pages??
    DeletePage(req.params.id).then(() => {
      FindAllSortedPages().then(sortedRes => {
        req.app.locals.pages = sortedRes;
        req.flash("success_msg", "Page deleted!");
        res.redirect("/admin/pages/");
      });
    });
  } /* end of delete function */
};