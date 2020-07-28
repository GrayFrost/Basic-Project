module.exports = class MyPlugin {
  constructor(options){
    this.options = options
  }
  apply(){
    console.log('applying');
  }
}