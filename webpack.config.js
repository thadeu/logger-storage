const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: '../public/index.html'
})

const config = {
  context: path.resolve(__dirname, "src"),
  entry: {
    'web-console': "./index.js"
  },
  output: {
    filename: "[name].[hash].min.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['env']
          }
        }
      },
      { 
        test: /\.html$/, use: ['html-loader']
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                minimize: true
              }
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  resolve: {
  },
  plugins: [
    new ExtractTextPlugin("[name].[hash].min.css"),
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
