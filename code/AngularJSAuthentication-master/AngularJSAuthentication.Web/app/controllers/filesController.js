﻿'use strict';
app.controller('fileController', ['$scope', '$location', '$timeout', 'authService', '$routeParams', '$http', function ($scope, $location, $timeout, authService, $routeParams, $http) {

    $scope.fileToUpload = null;
    $scope.urls = [];
    getUrls();
    $scope.uploadFile = function () {
        if ($scope.fileToUpload === null || typeof $scope.fileToUpload === "undefined") {
            alert('You have to choose a file!');
            return;
        }
     
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            var fileModel = {
                name: $scope.fileToUpload.name,
                base64String: event.target.result,
                extension: "." + ($scope.fileToUpload.name).substr((~-($scope.fileToUpload.name).lastIndexOf(".") >>> 0) + 2)
            };
            $http({ method: "post", url: 'http://localhost:26264/api/FileAPI/UploadFile', data: fileModel }).then(function (response) {
                getUrls();
            }, function (error) {
                getUrls();
            });
        }
        fileReader.readAsDataURL($scope.fileToUpload);
    }

    function getUrls() {
        $http.get('http://localhost:26264/api/FileAPI/GetFiles').then(function (response) {
            var json = JSON.parse(response.data);
            $scope.urls = json;
        });
    }

    $scope.getFileName = function (url) {
        return url.substr(60, url.indexOf('-'));
    }
}]);