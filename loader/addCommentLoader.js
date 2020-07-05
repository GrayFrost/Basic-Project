module.exports = function(source){
  const comment = `/* Added at ${new Date().toLocaleDateString()} */`;
  source = comment + source;
  return source
}