console.info('LoginCtrl Load!');

var appControllers = require('../app.controllers');

appControllers
  .controller('LoginCtrl', ['$scope', '$state', function ($scope, $state) {

    $scope.form = {
      username: '',
      password: ''
    };

    $scope.login = function (form) {

      $state.go('home');
    };


  }]);