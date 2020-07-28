const path = require("path");
const MyPlugin = require('../plugin/myPlugin');

module.exports = {
    context: path.resolve(__dirname, "../src"),
    entry: {
        // index: "./index.jsx",
        index: "./index2.js",
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "[name].js",
        // chunkFilename: '[name].chunk.js'
    },
    resolveLoader: {
        modules: ["node_modules", "../loader"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'addCommentLoader',
                    {
                        loader: "syncloader",
                        options: {
                            message: "这个是loader option的信息",
                        },
                    },
                ]
            },
        ],
    },
    resolve: {
        extensions: [".js"],
    },
    plugins: [
        new MyPlugin()
    ]
};
