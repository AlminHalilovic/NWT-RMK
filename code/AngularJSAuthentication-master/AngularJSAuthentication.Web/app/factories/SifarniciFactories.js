//SifarniciFactories.js
//Sluze da izvrse pozive koji se ponavljaju u kontrolerima sifarnika, primaju odgovarajuce parametre kao što su path od webapi servisa te povratni path
app.factory('SifarniciGetAllFactory', function (SifarniciService, ShareData, $http, $log) {
    return function ($scope, path) {
        $scope.isBusy = true;
        var promiseGetData = SifarniciService.getItem(path);

        promiseGetData.then(function (pl) {
            $log.debug(pl.data);
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
app.factory('SifarniciCreateFactory', function (SifarniciService, $location, ShareData) {
    return function ($scope, apiPath, returnPath, Item) {

        var promisePost = SifarniciService.postItem(apiPath, Item);


        promisePost.then(function (pl) {

            alert("Uspješno je unesen novi podatak u šifarnik!");
            $location.path(returnPath);
        },
              function (errorPl) {
                  $scope.error = 'Greška tokom učitavanja podataka', errorPl;
                  alert("Ispravite greske");
              });


    }
});
app.factory('SifarniciGetByIdFactory', function (SifarniciService, $location, ShareData) {
    return function ($scope, apiPath) {

        var promiseGetEmployee = SifarniciService.getItemId(apiPath, ShareData.value);
        promiseGetEmployee.then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data))[0];
            $scope.Item = response;
        },
              function (errorPl) {
                  $scope.error = 'Neuspješno učitavanje podataka', errorPl;
              });
    }

});
app.factory('SifarniciUpdateFactory', function (SifarniciService, $location, ShareData) {
    return function ($scope, apiPath, returnPath, Item) {

        var promisePutEmployee = SifarniciService.putItem(apiPath, $scope.Item.id, Item);
        promisePutEmployee.then(function (pl) {
            alert("Uspješno je izmjenjen podatak u šifarniku!");
            $location.path(returnPath);
        },
              function (errorPl) {
                  $scope.error = 'Greška tokom učitavanja podataka', errorPl;
              });


    }
});
app.factory('SifarniciDeleteFactory', function (SifarniciService, $location, ShareData) {
    return function ($scope, apiPath, returnPath) {

        var promisePutEmployee = SifarniciService.deleteItem(apiPath, ShareData.value);
        promisePutEmployee.then(function (pl) {
            alert("Uspješno je izbrisan podatak iz šifarnika!");
            $location.path(returnPath);
        },
              function (errorPl) {
                  $scope.error = 'Greška tokom učitavanja podataka', errorPl;
              });


    }
});