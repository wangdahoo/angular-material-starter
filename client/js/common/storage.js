console.info('Storage Load!');

var stub = require('./stub');
var tracking = require('./tracking');

var global = window;

function isStorageSupported(localStorage) {
  var supported = localStorage;

  // When Safari (OS X or iOS) is in private browsing mode, it appears as though localStorage
  // is available, but trying to call .setItem throws an exception below:
  // "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to add something to storage that exceeded the quota."
  if (supported) {
    var key = '__' + Math.round(Math.random() * 1e7);

    try {
      localStorage.setItem(key, key);
      localStorage.removeItem(key);
    }
    catch (err) {
      supported = false;
    }
  }

  return supported;
}

var ls = 'localStorage' in global && global.localStorage ? global.localStorage : stub;

if (!isStorageSupported(ls)) {
  ls = stub;
}

function Accessor(key, value) {
  if (arguments.length === 1) {
    return get(key);
  }
  return set(key, value);
}

function get(key) {
  try {
    return JSON.parse(ls.getItem(key));
  } catch(e) {
    return ls.getItem(key);
  }
}

function set(key, value) {
  try {
    ls.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    return false;
  }
}

function remove(key) {
  return ls.removeItem(key);
}

function clear() {
  return ls.clear();
}

Accessor.set = set;
Accessor.get = get;
Accessor.remove = remove;
Accessor.clear = clear;
Accessor.on = tracking.on;
Accessor.off = tracking.off;

module.exports = Accessor;