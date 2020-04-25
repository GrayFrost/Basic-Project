const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const devWebpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'development'
});

module.exports = devWebpackConfig;
