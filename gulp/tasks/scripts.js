const gulp = require("gulp");
const webpack = require("webpack");
const debugErrorEvent = require("../../important/AristosStuff/AristosLogger/AristosLogger").addDebug;

gulp.task("scripts", ["modernizr"], callback => {
  webpack(require("../../webpack.config"), (err, stats) => {
    if (err) {
      debugErrorEvent(err.toString(), "Script issue");
    }
    console.log(stats.toString());
    callback();
  });
}); /* end of scripts task */