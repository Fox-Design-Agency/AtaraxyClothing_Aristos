const addErrorEvent = require("../../../AristosStuff/AristosLogger/AristosLogger").addError;
const config = require("../../../AppStuff/config/config");
/* User queries */
const FindOneUserByID = require("../../adminModels/queries/user/FindOneUserWithID");

module.exports = {
  index(req, res, next) {
    res.render("../../../important/admin/views/settings/settings", {
      content: "",
      config: config.getAll()
    });
  } /* end of index function */,

  create(req, res, next) {
    FindOneUserByID(req.session.passport.user).then(user => {
      if (user.admin === 1) {
        let configs = config.getAll();
        let changes = req.body;
        let length = configs.length;
        for (let i = 0; i < length; i++) {
          config.updateItem(configs[i].name, changes[configs[i].name]);
        }
        res.redirect("back");
      } else {
        res.redirect("/users/login");
      }
    });
  } /* end of create function */,
  cancel(req, res, next) {
    res.redirect("/admin");
  } /* end of cancel function */
};
