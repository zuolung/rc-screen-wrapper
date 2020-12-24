/*
 * @Author: your name
 * @Date: 2020-12-23 09:29:54
 * @LastEditTime: 2020-12-23 18:09:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /react-fullScreenWrapper/webpack.lib.js
 */

const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "none",
  entry: {
    "fullScreen": "./src/components/fullScreen.js",
    "fullScreen.min": "./src/components/fullScreen.js",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "lib"),
    library: "plugin", // 打包暴露出去库的名称
    libraryExport: "default", // 
    libraryTarget: "umd", // var | this | global | window | umd | commonJS
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      }
    ],
  },

  /** umd */
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ // production下默认开启  ugifyPlugin碰到es6打包会出错，而他不会
        include: /\.min.js$/,
      })
    ]
  }
}