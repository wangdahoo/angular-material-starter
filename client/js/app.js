/* controllers */
require('./controller/login');
require('./controller/home');

var TPL_URL = '/templates/';

function tpl(tplName) {
  return TPL_URL + tplName + '.html';
}

module.exports = angular

  .module('app', ['appControllers'])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

      $stateProvider

        .state('login', {
          url: '/login',
          controller: 'LoginCtrl',
          templateUrl: tpl('login')
        })

        .state('home', {
          url: '/home',
          controller: 'HomeCtrl',
          templateUrl: tpl('home')
        })

      ;

      $urlRouterProvider.otherwise('/login');

    }])

  .run(['$rootScope', function ($rootScope) {

    console.info('Start!');

  }])

;
