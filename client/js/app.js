/* controllers */
require('./controller/login');
var TPL_URL = '/client/view/';

function tpl(tplName) {
  return TPL_URL + tplName + '.html';
}

module.exports = angular

  .module('app', ['appControllers'])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

      $stateProvider

        // 管理员登录
        .state('login', {
          url: '/login',
          controller: 'LoginCtrl',
          templateUrl: tpl('login')
        })

      ;

      $urlRouterProvider.otherwise('/login');

    }])

  .run(['$rootScope', function ($rootScope) {

    console.info('Start!');

  }])

;
