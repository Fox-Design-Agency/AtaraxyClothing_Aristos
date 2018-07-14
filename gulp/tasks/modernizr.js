const gulp = require("gulp");
const modernizr = require("gulp-modernizr");

gulp.task("modernizr", ()=>{
    return gulp.src(["./content/public/css/**/*.css","./content/public/scripts/**/*.js"])
    .pipe(modernizr({
        "options":[
            "setClasses"
        ]
    }))
    .pipe(gulp.dest("./content/temp/scripts/"));
}); /* end of modernizr task */
