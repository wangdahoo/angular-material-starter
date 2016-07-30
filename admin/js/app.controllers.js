require('./app.services');
require('./app.directives');

module.exports = angular.module('appControllers', ['appServices', 'appDirectives']);
