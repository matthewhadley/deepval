'use strict';

module.exports = function(obj, path, value, remove) {
  path = path.split('.');
  var pl = path.length - 1;

  for (var i = 0; i < pl; i += 1) {
    if (typeof value !== 'undefined' && typeof obj[path[i]] === 'undefined') {
      obj[path[i]] = {};
    } else if (!obj.hasOwnProperty(path[i])) {
      return undefined;
    }
    obj = obj[path[i]];
  }

  if (typeof value !== 'undefined') {
    if (remove) {
      return delete obj[path[pl]];
    } else {
      obj[path[pl]] = value;
    }
  }
  return obj[path[pl]];
};
