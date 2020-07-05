const loaderUtils = require('loader-utils');

// loader不要使用箭头函数
module.exports = function(source){
  const options = loaderUtils.getOptions(this);
  console.log(options)
  source += `console.log('${options.message}')`;
  // this.callback(null, source);
  return source;
}