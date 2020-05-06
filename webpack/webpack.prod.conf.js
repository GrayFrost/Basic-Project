const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const smp = new SpeedMeasurePlugin();

const _webpackConfig = webpackMerge(baseWebpackConfig, {
    mode: "production",
    devtool: "source-map",
});
const prodWebpackConfig = smp.wrap(_webpackConfig);

if (process.env.NODE_ENV === "analysis") {
    _webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports =
    process.env.NODE_ENV === "analysis" ? prodWebpackConfig : _webpackConfig;
