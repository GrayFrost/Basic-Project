# Basic-Project
从头搭建react环境全过程。

计划：
一个完整的流程。流程走完，再细分模块深入。

1. 基础目录划分
2. webpack基本配置
3. 搭建基本功能
9. 性能
5. 校验

## 基础目录划分

首先进行基本的目录创建。

```shell
mkdir Basic-Project
cd Basic-Project
npm init -y
git init
```
然后在目录下创建三个文件夹`public`，`src`，`webpack`。
``` 
├── public
├── src
└── webpack
```

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

```
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   └── index.jsx
└── webpack
    ├── webpack.base.conf.js
    ├── webpack.dev.conf.js
    └── webpack.prod.conf.js
```

### 根目录

除了生成的`package.json`外，目前需要在根目录下添加一些其他文件，先添加`README.md`，`.gitignore`和`.editorconfig`。现在根目录下的文件有：

* package.json 目前还是初始化的配置
* README.md 掌握markdown语法，谁都能写
* .gitignore 现在只需添加`node_modules`这一行配置
* .editorconfig 统一开发人员编辑器配置

```
├── README.md
├── .gitignore
├── .editorconfig
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   └── index.jsx
└── webpack
    ├── webpack.base.conf.js
    ├── webpack.dev.conf.js
    └── webpack.prod.conf.js
```

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

```
├── README.md
├── .gitignore
├── .editorconfig
├── .babelrc
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   └── index.jsx
└── webpack
    ├── webpack.base.conf.js
    ├── webpack.dev.conf.js
    └── webpack.prod.conf.js
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



## 搭建基本环境

### react

```shell
npm install react react-dom -S
```
```shell
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```
修改`.babelrc`
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```
修改webpack
```diff
{
+   test: /\.(m?js|jsx)$/,
    exclude: /(node_modules|bower_components)/,
    use: "babel-loader",
},
```
```diff
+ extensions: [".js", ".jsx"],
```
```diff
entry: {
+   index: "./index.jsx",
},
```
然后把项目里的index.js改为index.jsx，并添加内容。
```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function App(){
  return <div>Hello Webpack</div>
}
ReactDOM.render(<App />, document.querySelector('#root'));
```


### html

为了能够在浏览器中看到我们代码更改的效果，我们需要安装`html-webpack-plugin`。

```shell
npm install html-webpack-plugin -D
```

配置`webpack.base.conf.js`的plugins选项

```javascript
new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "../public", "index.html"),
  filename: "index.html",
}),
```

运行命令`npm run dev`，打开localhost:3000，可以在页面上看到`Hello Webpack`。



### source-map

但是目前通过控制台无法很好的调试我们的代码，在source中打开index.jsx，发现代码调试太难。需要配置devtool。分别对`webpack.dev.conf.js`和`webpack.prod.conf.js`进行配置

``` javascript
devtool: 'cheap-module-eval-source-map',
```

``` javascript
devtool: 'source-map'
```

重启项目。



### 样式
``` shell
npm i css-loader style-loader -D
```
修改`webpack.base.config.js`
``` javascript
{
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
},
```
预处理器，本次选用less。如果需要sass或stylus，请自行替换。
``` shell
npm install less less-loader -D
```
修改`webpack.base.conf.js`

```javascript
{
  test: /\.less$/,
    use: ["style-loader", "css-loader", "less-loader"],
},
```

然后给项目添加文件，新建`App.jsx`和`styles/App.less``

```
├── README.md
├── .gitignore
├── .editorconfig
├── .babelrc
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.jsx
│   ├── index.jsx
│   └── styles
│       └── App.less
└── webpack
    ├── webpack.base.conf.js
    ├── webpack.dev.conf.js
    └── webpack.prod.conf.js
```

主要更改集中于`App.less`

```less
@color: orange;

#app {
  color: @color;
}
```

然后在`App.jsx`中引入样式文件

```diff
import React from 'react';
+ import './styles/App.less';

function App(){
  return <div id="app">Hello Webpack</div>
}

export default App;
```



TODO: postcss css模块化



### 图片、字体文件
``` shell
npm install file-loader url-loader -D
```

url-loader封装了file-loader但不依赖file-loader。但是在文件大小（单位byte）低于指定的限制时，可以返回一个DataURL。配置`webpack.base.conf.js`

``` javascript
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
```

添加images目录，再修改App.jsx

``` diff
import React from "react";
import "./styles/App.less";
+ import img from "./images/a.jpg";

function App() {
    return (
        <div id="app">
            <h1>Hello Webpack</h1>
+           <img src={img} alt="" />
        </div>
    );
}

export default App;
```



TODO: 自定义file name  hash



### 清空dist

每次打包前清空dist目录

``` shell
npm install clean-webpack-plugin -D
```

修改`webpack.base.conf.js`

``` diff
+ const {CleanWebpackPlugin} = require('clean-webpack-plugin');

plugins: [
    ...,
+    new CleanWebpackPlugin()
],
```



TODO: copywebpackplugin

TODO: ProvidePlugin 配置全局变量

### 热更新

现在虽然我们配置了devserver可以动态更新，但每次都是刷新浏览器，我们想要局部更新。

首先配置 `devServer` 的 `hot` 为 `true`

并且在 `plugins` 中增加 `new webpack.HotModuleReplacementPlugin()`

修改`webpack.dev.conf.js`

``` javascript
const devWebpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: '3000',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
```

此时还是整个页面刷新。  

在入口文件index.jsx中添加

```javascript
if(module && module.hot) {
    module.hot.accept()
}
```


### 环境判断
有时我们需要在一个公共文件中判断当前的环境是生成环境还是开发环境。安装`cross-env`。
``` shell
npm install cross-env -S
```

修改package.json的scripts

``` diff
+ "dev": "cross-env NODE_ENV=devlopment webpack-dev-server --config webpack/webpack.dev.conf.js",
+ "build": "cross-env NODE_ENV=production webpack --config webpack/webpack.prod.conf.js"
```
`cross-env`能够帮我们设置环境变量的时候解决不同系统之间的兼容性问题。


## 性能

### 分析

#### 速度

安装`speed-measure-webpack-plugin`，该插件能分析loader和plugin的耗时。

``` shell
npm install speed-measure-webpack-plugin -D
```


修改`webpack.prod.conf.js`

``` javascript
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const _webpackConfig = webpackMerge(baseWebpackConfig, {
  mode: 'production',
  devtool: 'source-map'
});
const prodWebpackConfig = smp.wrap(_webpackConfig);

module.exports = process.env.NODE_ENV === 'analysis' ? prodWebpackConfig : _webpackConfig;
```



修改`package.json`的scripts

```
"analysis": "cross-env NODE_ENV=analysis webpack --config webpack/webpack.prod.conf.js"
```



执行`npm run analysis`，可以看到分析结果

```
 SMP  ⏱  
General output time took 1.69 secs

 SMP  ⏱  Plugins
HtmlWebpackPlugin took 0.091 secs
CleanWebpackPlugin took 0.013 secs
MiniCssExtractPlugin took 0.002 secs

 SMP  ⏱  Loaders
babel-loader took 0.643 secs
  module count = 3
modules with no loaders took 0.508 secs
  module count = 9
url-loader took 0.495 secs
  module count = 1
mini-css-extract-plugin, and 
css-loader, and 
less-loader took 0.259 secs
  module count = 1
css-loader, and 
less-loader took 0.237 secs
  module count = 1
html-webpack-plugin took 0.015 secs
  module count = 1
```



#### 大小

安装`webpack-bundle-analyzer`，该插件能够分析打包后各类包的引用大小，我们需要针对体积过大的文件进行优化处理。

``` shell
npm install webpack-bundle-analyzer -D
```



修改`webpack.prod.conf.js`

```diff
const webpackMerge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
+ const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const smp = new SpeedMeasurePlugin();

const _webpackConfig = webpackMerge(baseWebpackConfig, {
    mode: "production",
    devtool: "source-map",
});
const prodWebpackConfig = smp.wrap(_webpackConfig);

+ if (process.env.NODE_ENV === "analysis") {
+    _webpackConfig.plugins.push(new BundleAnalyzerPlugin());
+ }

module.exports =
    process.env.NODE_ENV === "analysis" ? prodWebpackConfig : _webpackConfig;
```

执行`npm run analysis`即可。



### 压缩代码
#### 压缩js
terser

#### 抽离css并压缩

``` shell
npm install mini-css-extract-plugin -D
```

webpack4使用`mini-css-extract-plugin`。

修改`webpack.base.conf.js`

修改webpack.base.conf.js

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const env = process.env.NODE_ENV;

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

plugins: [
    ...,
    new MiniCssExtractPlugin({}),
],
```



todo: 与extract-text-webpack-plugin比较

optimize-css-assets-webpack-plugin



### 按需加载

import

添加一个文件buttonClickFunc.js

```javascript
const sayHello = () => {
    console.log("hello world");
};
const sayGoodbye = () => {
    console.log("goodbye");
};

export { sayHello, sayGoodbye };
```

修改app.jsx

```jsx
import React from "react";
import "./styles/App.less";
import img from "./images/a.jpg";

function App() {
  const onClick = () => {
    import('./buttonClickFunc').then(module => {
      const {sayHello, sayGoodbye} = module;
      sayHello();
      sayGoodbye();
    })
  }
    return (
        <div id="app">
            <h1>Hello Webpack</h1>
            <button onClick={onClick}>click me to load file</button>
            <img src={img} alt="" />
        </div>
    );
}

export default App;

```

当我们点击button的时候，看控制台，发现会多请求一个0.js。

TODO: chunkfilename webpackchunkname魔法注释

### 范围
#### resolve

### tree-shaking
### scope hoist
### code spliting
### 按需引入
### webpack bundle analyzer

speed-measure-webpack-plugin

splitchunk

dllplugin

loader开启缓存

合理使用sourcemap

loader exclude include



mini-css-extract-plugin   optimize-css-assets-webpack-plugin

moment ignoreplugin

lodash 按需加载 配置babel 注意同名情况报错解决

## 校验

### typescript
### lint
#### eslint
eslint eslint-loader
#### stylelint
#### commitlint
husky
### prettier
### editorconfig

## 其他

多页

跨域

## 总结

### hash

hash

chunkhash

contenthash

### loader
css-loader style-loader less-loader postcss-loader
file-loader url-loader

image-webpack-loader

thread-loader

### lugin
* clean-webpack-plugin
* webpack.DefinePlugin
* html-webpack-plugin
* terser-webpack-plugin
* mini-css-extract-plugin
* case-sensitive-paths-webpack-plugin
* 
* progress-plugin
  friendly-errors-webpack-plugin node-notifier

webpack-bundle-analyzer

speed-measure-webpack-plugin

optimize-css-assets-webpack-plugin

purgecss-webpack-plugin

dllplugin

### 原理
webpack打包原理

hmr

手写loader plugin



