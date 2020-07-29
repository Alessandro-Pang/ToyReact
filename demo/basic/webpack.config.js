/*
 * @Author: zi.yang
 * @Date: 2020-07-27 21:16:51
 * @LastEditTime: 2020-07-28 13:06:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ToyReact\demo\day01\webpack.config.js
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const config = {
  target: "web",
  mode: "developement",
  entry: "./index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle-[hash:8].js",
  },
  resolve:{
    extensions:[".js",".jsx",".json"],
    alias:{
      "@": path.join(__dirname,"src")
    }
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        loader: "babel-loader",
        options: {
          babelrc: true,
        },
        exclude:/node_modules/,
      },
    ],
  },

  devServer: {
    host: "127.0.0.1",
    port: "3000",
    open: "Chrome",
    hot: true,
    noInfo: false,
    contentBase: path.join(__dirname, "dist"),
    overlay: {
      error: true,
      warn: true,
    },
  },

  plugins:[
    new HtmlWebpackPlugin({
      template:path.join(__dirname,"public/index.html"),
      filename:"index.html",
      inject:"body",
      showError:true
    })
  ]
};

module.exports = config;