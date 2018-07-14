const path = require("path");

module.exports = {
  entry: {
    main: "./content/public/scripts/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./content/temp/scripts"),
    filename: "[name].js"
  },

  module: {
    rules: [
      {
        loaders: "babel-loader",
        query: {
          presets: ["env"]
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
