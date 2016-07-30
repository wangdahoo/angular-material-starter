console.info('HomeCtrl Load!');

var appControllers = require('../app.controllers');

appControllers
  .controller('HomeCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {

    $scope.toggle = function () {
      $mdSidenav('left').toggle();
    }

  }]);
