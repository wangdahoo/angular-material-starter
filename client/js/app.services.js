require('./common.services');

var Env = require('./service/env');

module.exports =
  angular.module('appServices', ['commonServices'])

  .factory('$env', [function () {
    return Env;
  }])

;
