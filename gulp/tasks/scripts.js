const gulp = require("gulp");
const webpack = require("webpack");
const Logger = require("../../important/AristosStuff/AristosLogger/AristosLogger").Logger;

gulp.task("scripts", ["modernizr"], callback => {
  webpack(require("../../webpack.config"), (err, stats) => {
    if (err) {
      Logger.debug(err.toString());
    }
    console.log(stats.toString());
    callback();
  });
}); /* end of scripts task */