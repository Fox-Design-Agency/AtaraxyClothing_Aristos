const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const del = require("del");
const usemin = require("gulp-usemin");
const rev = require("gulp-rev");
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

/* not working right, needs NODE_ENV set up and better pathing support */
gulp.task("previewDist", ["nodemon"], () => {
  browserSync.init({
    notify: false,
    proxy: "http://localhost:3000",
    port: 3001
  });
}); /* end of preview dist task */

gulp.task("deleteDistFolder", ["icons"], () => {
  return del("./dist");
}); /* end of delete dist folder */

gulp.task("copyGeneralFiles", ["deleteDistFolder"], () => {
  const pathsToCopy = [
    "./important/**/*",
    "!./content/index.js",
    "!./content/theme/**",
    "!./content/theme/views/**",
    "!./content/assets/images/**",
    "!./content/assets/css/**",
    "!./content/assets/scripts",
    "!./content/assets/scripts/**",
    "!./content/temp",
    "!./content/temp/**"
  ];
  return gulp.src(pathsToCopy).pipe(gulp.dest("./dist"));
}); /* end of copy general files */

gulp.task("optimizeImages", ["deleteDistFolder"], () => {
  return gulp
    .src([
      "./content/public/images/**/*",
      "!./content/public/images/icons",
      "!./content/public/images/icons/**/*"
    ])
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
      })
    )
    .pipe(gulp.dest("./dist/public/images"));
}); /* end of optimize Images task */

gulp.task("useminTrigger", ["deleteDistFolder"], function() {
  gulp.start("usemin");
}); /* end of useminTrigger task */

gulp.task("usemin", ["styles", "scripts"], () => {
  return gulp
    .src("./content/theme/**")
    .pipe(
      usemin({
        css: [
          function() {
            return rev();
          },
          function() {
            return cssnano();
          }
        ],
        js: [
          function() {
            return rev();
          },
          function() {
            return uglify();
          }
        ]
      })
    )
    .pipe(gulp.dest("./dist"));
}); /* end of usemin task */

gulp.task("build", [
  "deleteDistFolder",
  "copyGeneralFiles",
  "optimizeImages",
  "useminTrigger"
]);
