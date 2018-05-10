const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
let filename = 'logger-storage.js';
let plugins = [];

const htmlPlugin = new HtmlWebpackPlugin({
  template: './public/index.html'
})

const config = {
  entry: path.resolve(__dirname, "src/logger-storage.js"),
  devtool: "source-map",
  target: "web",
  node: {
    fs: "empty"
  },
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
        use: ['babel-loader']
      },
      { 
        test: /\.html$/, use: ['html-loader']
      }
    ]
  },
  plugins: [
    htmlPlugin,
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    compress: true,
    stats: 'errors-only',
    open: true
  }
}

module.exports = config;
