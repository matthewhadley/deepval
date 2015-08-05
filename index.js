'use strict';

var deepval = function(obj, path, value, remove) {
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

module.exports = deepval;

module.exports.get = function(obj, path) {
  return deepval(obj, path);
};

module.exports.set = function(obj, path, value) {
  return deepval(obj, path, value);
};

module.exports.del = function(obj, path) {
  return deepval(obj, path, null, true);
};
