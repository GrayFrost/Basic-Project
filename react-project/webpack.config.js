/**
 * Created by Administrator on 2017/5/1.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + "/main.js",
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 8778
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".less"]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body"
    })
  ]
};