const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const env = process.env.NODE_ENV;
console.log("env", env);

module.exports = {
    context: path.resolve(__dirname, "../src"),
    entry: {
        index: "./index.jsx",
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js",
        // chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [
                    env === "production"
                        ? MiniCssExtractPlugin.loader
                        : "style-loader",
                    "css-loader",
                ],
            },
            {
                test: /\.less$/,
                use: [
                    env === "production"
                        ? MiniCssExtractPlugin.loader
                        : "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public", "index.html"),
            filename: "index.html",
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({}),
    ],
};
