app.factory('DokumentiGetAllFactory', function (DokumentiService, ShareData, $http, $log) {
    return function ($scope, path) {
        $scope.isBusy = true;
        var promiseGetData = DokumentiService.getItem(path);

        promiseGetData.then(function (pl) {
            //$log.debug(pl.data);
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.collection = response;

        },
              function (errorPl) {
                  $scope.error = 'Greška tokom učitavanja podataka', errorPl;
              })
        .then(function () {
            $scope.isBusy = false;
        });

    }
});
app.factory('DokumentiCreateFactory', function (DokumentiService, $location, SweetAlert, ShareData) {
    return function ($scope, apiPath, returnPath, Item) {

        var promisePost = DokumentiService.postItem(apiPath, Item);
        promisePost.then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            if (response.ok == true) {
                SweetAlert.swal({
                    title: "Uspjeh!",
                    text: response.message,
                    type: "success"
                }, function () {
                    $location.path(returnPath);
                });
            }
            else {
                SweetAlert.swal("Greška!", response.message, "error");
            }
        },
              function (errorPl) {
                  $scope.error = 'Greška tokom učitavanja podataka', errorPl;
                  alert("Ispravite greske");
              });


    }
});
app.factory('DokumentiGetByIdFactory', function (DokumentiService, $location, ShareData) {
    return function ($scope, apiPath) {

        var promiseGetEmployee = DokumentiService.getItemId(apiPath, ShareData.value);
        promiseGetEmployee.then(function (pl) {
            $scope.Item = pl.data;
            console.log(pl.data);
        },
              function (errorPl) {
                  $scope.error = 'Neuspješno učitavanje podataka', errorPl;
              });
    }
});

