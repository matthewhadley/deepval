'use strict';

var deepval = function(obj, path, value, remove) {
  if (!obj) { // avoid throwing on a bad obj. just return undefined.
    return undefined;
  }

  if (!Array.isArray(path)) {
    path = path.split('.');
  }
  var pl = path.length - 1;

  for (var i = 0; i < pl; i += 1) {
    var key = path[i];
    var pathIsNullOrUndefined = isNullOrUndefined(obj[key]);
    if (value !== undefined && pathIsNullOrUndefined) {
      obj[key] = {};
    } else if (!obj.hasOwnProperty(path[i]) || pathIsNullOrUndefined) {
      return undefined;
    }
    obj = obj[path[i]];
  }

  if (remove) {
    return delete obj[path[pl]];
  } else if (value !== undefined) { // allow setting a value to null
    obj[path[pl]] = value;
  }
  return obj[path[pl]];
};

function isNullOrUndefined(val) {
  return val === undefined || val === null;
}

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

module.exports.dotpath = function() {
  return Array.prototype.slice.call(arguments).join('.');
};
