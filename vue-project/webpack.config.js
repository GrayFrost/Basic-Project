/**
 * Created by Administrator on 2017/5/1.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + "/main.js",
  output: {
    path: __dirname + "/dist/",
    filename: "[name].js"
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8778
  },
  module: {
    rules: [
      {
        test: /\.less/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.css/,
        use:[
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.vue$/,
        use:[
          {loader: "vue-loader"}
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use:['url-loader']
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: [".js",".vue",".less"],
    alias: {
      'components': path.resolve(__dirname, './src/components'),
      'jquery': 'jquery'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  ]
};
