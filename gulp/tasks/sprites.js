const gulp = require("gulp");
const svgSprite = require("gulp-svg-sprite");
const rename = require("gulp-rename");
const del = require("del");
const svg2png = require("gulp-svg2png");

const config = {
  shape: {
    spacing: {
      padding: 2
    }
  },
  mode: {
    css: {
      variables: {
        replaceSvgWithPng: function() {
          return function(sprite, render) {
            return render(sprite)
              .split(".svg")
              .join(".png");
          };
        }
      },
      sprite: "sprite.svg",
      render: {
        css: {
          template: "./gulp/templates/sprite.css"
        }
      }
    }
  }
}; /* end of config */

gulp.task("beginClean", () => {
  return del(["./app/temp/sprite", "./content/public/images/sprites"]);
}); /* end of beginClean task */

gulp.task("createSprite", ["beginClean"], () => {
  return gulp
    .src("./content/public/images/icons/**/*.svg")
    .pipe(svgSprite(config))
    .pipe(gulp.dest("./content/public/temp/sprite/"));
}); /* end of createSprite task */

// gulp.task("createPngCopy", ["createSprite"], () => {
//   return gulp
//     .src("./content/temp/sprite/css/*.svg")
//     .pipe(svg2png())
//     .pipe(gulp.dest("./content/temp/sprite/css"));
// }); /* end of create svg copy task */

gulp.task("copySpriteGraphic", ["copySpriteCSS"],() => {
  return gulp
    .src("./content/temp/sprite/css/**/*.svg")
    .pipe(gulp.dest("./content/public/images/sprites"));
}); /* end of copySpriteGraphic task */

gulp.task("copySpriteCSS", ["createSprite"], () => {
  return gulp
    .src("./content/public/temp/sprite/css/*.css")
    .pipe(rename("_sprite.css"))
    .pipe(gulp.dest("./content/public/css/modules"));
}); /* end of copySpriteCSS */

gulp.task("endClean", ["copySpriteGraphic", "copySpriteCSS"], () => {
  return del("./content/public/temp/sprite");
}); /* end of endClean */

gulp.task("icons", [
  "beginClean",
  "createSprite",
  // "createPngCopy",
  "copySpriteGraphic",
  "copySpriteCSS",
  "endClean"
]);