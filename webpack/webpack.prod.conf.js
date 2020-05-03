const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const prodWebpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map'
});

module.exports = prodWebpackConfig;
