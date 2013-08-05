module.exports = function(obj, path, value){
  path = path.split('.');
  var pl = path.length - 1;

  for (var i = 0; i < pl; i += 1) {
    obj = obj[path[i]];
  }

  if(value) {
    obj[path[pl]] = value;
  }
  return obj[path[pl]];
};
