/* controllers */
require('./controller/login');
require('./controller/dashboard');
require('./controller/home');

var TPL_URL = '/admin/view/';

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

        // Dashboard Layout
        .state('dashboard', {
          url: '/dashboard',
          abstract: true,
          controller: 'DashboardCtrl',
          templateUrl: tpl('dashboard')
        })

        // 默认页
        .state('dashboard.home', {
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
