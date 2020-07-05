# loader plugin

[参考文章](https://juejin.im/post/5eae43f85188256d841a3b8b)，跟着走一遍

## 打包原理

## loader
``` javascript
module.exports = function(source){

}
```
loader就是一个函数，参数source接收string或buffer，处理后再返回
同步loader this.callback()
异步loader this.async()

获取webpack中编写的loader的options
使用loader-utils  getOptions


## plugin