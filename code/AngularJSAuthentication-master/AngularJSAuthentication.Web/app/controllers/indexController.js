'use strict';
app.controller('indexController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.navbarExpanded = false;
    $scope.logOut = function () {
        authService.logOut();
        $location.path('/home');
    }

    $scope.authentication = authService.authentication;
    $scope.extendNavbar = function () {
        console.log($scope.navbarExpanded);
        $scope.navbarExpanded = !$scope.navbarExpanded;
        console.log($scope.navbarExpanded);
    };
}]);