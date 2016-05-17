'use strict';
app.controller('adminController', ['$scope', '$location', '$timeout', 'authService','$routeParams', '$http', function ($scope, $location, $timeout, authService,$routeParams, $http) {

    $scope.fileToUpload = null;

    $scope.uploadFile = function () {
        console.log($scope.fileToUpload);
    }

    $http.get('http://localhost:26264/api/RoleAPI/GetRolesForUserByName/' + authService.authentication.userName).then(function (pl) {
        var json = JSON.parse(pl.data);
        var found = false;
        for (var i = 0; i < json.length; i++) {
            if (json[i].RoleName == "Administrator") {
                found = true;
                break;
            }
        }
        if (!found) {
            alert('Nemate pristup ovom modulu aplikacije!');
            $location.path('/home');
        }
    });
    
}]);