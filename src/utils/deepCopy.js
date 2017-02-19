global.deepCopy = function(data) {
  if ( is("String", data) ) {
    return data;
  }
  return data.concat();
}