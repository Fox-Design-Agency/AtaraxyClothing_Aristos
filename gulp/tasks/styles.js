const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssvars = require("postcss-simple-vars");
const nested = require("postcss-nested");
const cssimport = require("postcss-import");
const mixins = require("postcss-mixins");
const hexrgba = require("postcss-hexrgba");
const debugAddEvent = require("../../important/AristosStuff/AristosLogger/AristosLogger").addDebug;

gulp.task("styles", () => {
  return gulp
    .src("./content/public/css/theme.css")
    .pipe(postcss([cssimport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .on("error", function(errorInfo) {
      debugAddEvent(errorInfo.toString(), "CSS Issue");
      this.emit("end");
    })
    .pipe(gulp.dest("./content/public/temp/styles"));
}); /* end of styles task */

gulp.task("adminStyles",()=> {
  return gulp
  .src("./important/admin/admincss/main.css")
    .pipe(postcss([cssimport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .on("error", function(errorInfo) {
      debugAddEvent(errorInfo.toString(), "CSS Issue");
      this.emit("end");
    })
    .pipe(gulp.dest("./content/public/temp/styles"))
}); /* end of admin Styles task */