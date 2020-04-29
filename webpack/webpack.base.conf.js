const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, "../src"),
    entry: {
        index: "./index.jsx",
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public', 'index.html'),
      filename: 'index.html'
    })],
};
