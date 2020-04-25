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
```
npm init -y
git init
```
### public 公共资源
favicon.ico 从react项目中拷来的图标
index.html 啥都还没引入，连同目录下的icon也没。
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
### src 项目主要内容
index.js

### webpack webpack配置

### 根目录
#### package.json
目前还是初始化的配置。 

#### README.md
掌握markdown语法，谁都能写。

#### .gitignore
```
node_modules
```

#### .editorconfig

## webpack基本配置
```
npm install webpack webpack-cli -D
npm install webpack-merge -D
```
区分开发环境和生产环境（目前暂不考虑测试环境）。
新建三个文件`webpack.base.conf.js`，`webpack.dev.conf.js`，`webpack.prod.conf.js`。文件的命名格式参考了`vue-cli`。
在base中写开发环境和生产环境都使用的公共配置，然后开发和生产的配置文件通过webpack merge合并了base配置后，再分别针对配置。

### base
目前先对基本的js进行解析，安装babel

### dev
安装webpack dev server
合并base

### prod
合并base

最后配置package.json 添加dev build命令


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

