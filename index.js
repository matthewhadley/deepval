module.exports = function(obj, path, value){
  path = path.split('.');
  var pl = path.length - 1;

  for (var i = 0; i < pl; i += 1) {
    if(typeof value !== 'undefined' && typeof obj[path[i]] === 'undefined'){
      obj[path[i]] = {};
    }
    obj = obj[path[i]];
  }

  if(typeof value !== 'undefined'){
    obj[path[pl]] = value;
  }
  return obj[path[pl]];
};
