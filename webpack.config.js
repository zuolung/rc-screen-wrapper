/*
 * @Author: your name
 * @Date: 2020-12-23 09:29:54
 * @LastEditTime: 2020-12-24 10:02:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /rc-screen-wrapper/webpack.config.js
 */
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/main.js",
  output: {
    // 打包好的文件存放在哪里，以及怎么命名
    path: path.join(__dirname, '/disk'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,             // 这里！
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {                       // 还有这里！
              modules: true
            }
          },
        ]
      }
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    })
  ]
}