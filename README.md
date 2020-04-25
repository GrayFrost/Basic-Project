# Basic-Project
从头搭建react环境全过程。

计划：
1. 基础目录划分
2. webpack基本配置
3. react相关
4. loader
5. plugin
6. typescript
7. lint
8. css module
9. 性能

## 基础目录划分

首先进行基本的目录创建。

```shell
mkdir Basic-Project
cd Basic-Project
npm init -y
git init
```
然后在目录下创建三个文件夹`public`，`src`,`webpack`。

### public 

用于放公共资源。

目前该目录下有：

* favicon.ico 从react项目中拷来的图标
* index.html 页面html文件，啥都还没引入，甚至连同目录下的icon也没引用。

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```
### src 

核心代码目录

目前该目录下有：

* index.js

### webpack 

webpack配置

目前该目下有三个文件：

* webpack.base.conf.js
* webpack.dev.conf.js
* webpack.prod.conf.js

### 根目录

除了生成的`package.json`外，目前需要在根目录下添加一些其他文件，先添加`README.md`，`.gitignore`和`.editorconfig`。现在根目录下的文件有：

* package.json 目前还是初始化的配置

* README.md 掌握markdown语法，谁都能写
* .gitignore 现在只需添加`node_modules`这一行配置
* .editorconfig 统一开发人员编辑器配置

## webpack基本配置
```
npm install webpack webpack-cli -D
npm install webpack-merge -D
```
区分开发环境和生产环境（目前暂不考虑测试环境）。
前面已新建三个了文件`webpack.base.conf.js`，`webpack.dev.conf.js`，`webpack.prod.conf.js`。文件的命名格式参考了`vue-cli`。
在base中写开发环境和生产环境都使用的公共配置，然后开发和生产的配置文件通过webpack merge合并了base配置后，再分别针对配置。

### base
目前先对基本的js进行解析，安装`babel`

``` shell
npm install babel-loader @babel/core @babel/preset-env -D
```

TODO: 了解@babe/core @babel/preset-env的作用l

然后参照官网的配置写一下

``` javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },
  ],
},
```

为了统一管理babel配置，我们将配置写到一份单独的文件。  

根目录下新建一个名为`.babelrc`的文件，然后将我们刚才写的配置抽离到这个文件中

``` json
{
    "presets": ["@babel/preset-env"]
}
```

然后`webpack.base.conf.js`中的配置变为

``` javascript
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: "babel-loader",
    },
  ],
},
```

目前的雏形

``` javascript
const webpack = require("webpack");
const path = require("path");

module.exports = {
    context: path.resolve(__dirname, "../src"),
    entry: {
        index: "./index.js",
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [".js"],
    },
    plugins: [],
};
```

TODO: 解释context 

### dev
安装webpack dev server

``` shell
npm install webpack-dev-server -D
```

合并base。目前webpack.dev.conf.js中的配置为

```javascript
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const devWebpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    port: '3000'
  }
});

module.exports = devWebpackConfig;

```

在package.json中添加命令

``` diff
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
+ "dev": "webpack-dev-server --config webpack/webpack.dev.conf.js",
},
```

然后我们在src的index.js中添加一行代码`console.log('hello webpack');`。

在此进行一个插曲，安装html-webpack-plugin，为了方便可以观察到我们的代码更改。安装步骤可以先跳到后面的plugin章节再回来。

运行命令`npm run dev`，打开localhost:3000，看控制台是否输出hello webpack。

### prod
合并base

目前为

```javascript
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const prodWebpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'production'
});

module.exports = prodWebpackConfig;
```



最后配置package.json 添加dev build命令

```diff
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "webpack-dev-server --config webpack/webpack.dev.conf.js",
+ "build": "webpack --config webpack/webpack.prod.conf.js"
},
```




## react相关
```
npm install react react-dom -S
```

## loader
babel-loader
css-loader style-loader less-loader postcss-loader
file-loader url-loader

## plugin


defineplugin
html-webpack-plugin

```
npm install html-webpack-plugin -D
```

目前现在webpack.base.conf.js里配置。

TODO: 根据dev prod环境分别配置

terser-webpack-plugin
mini-css-extract-plugin
progress-plugin
clearn-webpack-plugin
friendly-errors-webpack-plugin node-notifier

## devServer
webpack dev server

## 修改npm命令

## typescript
## lint
### eslint
eslint eslint-loader
### stylelint
### commitlint
husky
### prettier
### editorconfig
## css module
## 性能划分
### tree-shaking
### scope hoist
### code spliting
### 按需引入
### webpack bundle analyzer

