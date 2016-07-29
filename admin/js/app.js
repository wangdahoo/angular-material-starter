/* controllers */
require('./controller/login');

module.exports = angular

  .module('app', ['appControllers'])

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

      $stateProvider

        // 管理员登录
        .state('login', {
          url: '/login',
          controller: 'LoginCtrl',
          templateUrl: '/view/login.html'
        })

      ;


    }])

  .run(['$rootScope', function ($rootScope) {

    console.info('Start!');

  }])

;
