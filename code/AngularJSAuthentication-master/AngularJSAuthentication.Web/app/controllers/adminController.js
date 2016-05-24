'use strict';
app.controller('adminController', ['$scope', '$location', '$timeout', 'authService','$routeParams', '$http','ngAuthSettings', function ($scope, $location, $timeout, authService,$routeParams, $http,ngAuthSettings) {

    $scope.fileToUpload = null;
    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    $scope.uploadFile = function () {
        console.log($scope.fileToUpload);
    }

    $http.get(serviceBase+'api/RoleAPI/GetRolesForUserByName/' + authService.authentication.userName).then(function (pl) {
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