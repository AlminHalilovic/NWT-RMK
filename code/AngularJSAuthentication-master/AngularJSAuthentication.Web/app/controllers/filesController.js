'use strict';
app.controller('fileController', ['$scope', '$location', '$timeout', 'authService', '$routeParams', '$http', 'ngAuthSettings', function ($scope, $location, $timeout, authService, $routeParams, $http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    $scope.fileToUpload = null;
    $scope.urls = [];
    $scope.isBusy = false;
    getUrls();
    $scope.uploadFile = function () {
        if ($scope.fileToUpload === null || typeof $scope.fileToUpload === "undefined") {
            alert('You have to choose a file!');
            return;
        }
        $scope.isBusy = true;
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            var fileModel = {
                name: $scope.fileToUpload.name,
                base64String: event.target.result,
                extension: "." + ($scope.fileToUpload.name).substr((~-($scope.fileToUpload.name).lastIndexOf(".") >>> 0) + 2)
            };
            
            $http({ method: "post", url: serviceBase+'api/FileAPI/UploadFile', data: fileModel }).then(function (response) {
                getUrls();
                $scope.isBusy = false;
            }, function (error) {
                getUrls();
                $scope.isBusy = false;
            });
        }
        fileReader.readAsDataURL($scope.fileToUpload);
    }

    function getUrls() {
        $http.get(serviceBase+'api/FileAPI/GetFiles').then(function (response) {
            var json = JSON.parse(response.data);
            $scope.urls = json;
        });
    }

    $scope.getFileName = function (url) {
        return url.substr(60, url.indexOf('-'));
    }
}]);