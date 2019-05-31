const pkg = require("./package.json");
const webpack = require("webpack");
const path = require("path");

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

let filename;
let plugins = [];
let mode;

module.exports = () => {
  if (process.env.NODE_ENV === "production") {
    mode = "production";
    filename = "logger-storage.min.js";
    plugins.push(new UglifyJSPlugin({ sourceMap: true }));
  } else {
    mode = "development";
    filename = "logger-storage.js";
  }

  return {
    entry: path.resolve(__dirname, "src/logger-storage.js"),
    devtool: "source-map",
    target: "web",
    node: {
      fs: "empty"
    },
    mode: "production",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: filename,
      library: "loggerStorage"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /src/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        }
      ]
    }
  };
};
