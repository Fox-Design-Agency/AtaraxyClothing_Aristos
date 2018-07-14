const path = require("path");
const expressValidator = require("express-validator");
/* needs work */
module.exports = app => {
  /* Express Validator Middleware */
  app.use(
    expressValidator({
      errorFormatter: function(param, msg, value) {
        let namespace = param.split("."),
          root = namespace.shift(),
          formParam = root;

        while (namespace.length) {
          formParam += "[" + namespace.shift() + "]";
        }

        return {
          param: formParam,
          msg: msg,
          value: value
        };
      },
      customValidators: {
        isImage: function(value, filename) {
          let extension = path.extname(filename).toLowerCase();
          switch (extension) {
            case ".jpg":
              return ".jpg";
            case ".jpeg":
              return ".jpeg";
            case ".png":
              return ".png";
            case ".svg":
              return ".svg";
            case "":
              return ".jpg";
            default:
              return false;
          }
        }
      }
    })
  );
};
