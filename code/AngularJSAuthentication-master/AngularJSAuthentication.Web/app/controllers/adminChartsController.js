'use strict';
app.controller('adminChartsController', ['$scope', '$location', '$timeout', 'authService', '$routeParams','SifarniciService','$rootScope', '$http','ngAuthSettings', function ($scope, $location, $timeout, authService, $routeParams,SifarniciService,$rootScope, $http,ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;


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

    $scope.isChartReady = false;
    $scope.maxDate = new Date();
    $scope.isOpenFrom = false;
    $scope.isOpenTo = false;
    $scope.formatDate = function (date) {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    };
    $scope.dateFormat = 'dd.MM.yyyy';

    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(),
        startingDay: 1
    };
    $scope.openPopupFrom = function () {
        $scope.isOpenFrom = !$scope.isOpenFrom;
    };
    $scope.openPopupTo = function () {
        $scope.isOpenTo = !$scope.isOpenTo;
    };

    $scope.documentsData = {
       
        availableDocuments: [
          { id: 'Primka', name: 'Primka'},
          { id: 'Izdatnica', name: 'Izdatnica' },
          { id: 'Pocetno stanje', name: 'Pocetno stanje' },
          { id: 'Inventura/Visak', name: 'Inventura/Visak' },
          { id: 'Inventura/Manjak', name: 'Inventura/Manjak' },
          { id: 'Visak/Manjak', name: 'Visak/Manjak' }
        ],
        documentSelect: null,
        documentsFrom:new Date(),
        documentsTo:new Date(),

    };

    $scope.myDataSource = {
        chart: {
            caption: "Dijagram dokumenata",
            subcaption: "Od" + startDate + " do " + endDate,
            startingangle: "120",
            showlabels: "0",
            showlegend: "1",
            enablemultislicing: "0",
            slicingdistance: "15",
            showpercentvalues: "1",
            showpercentintooltip: "0",
            plottooltext: " $label , ukupno : $datavalue",
            theme: "fint"
        },
        data: [
            {
                label: "Dokument",
                value: 0
            },
            {
                label: "Storno dokument",
                value: 0
            }
        ]
    }

    var startDate = new Date(); // sluze za prikaz dijagrama i dobavljanje iz api
    var endDate = new Date();

    $scope.showChart=function()
    {
        if ($scope.documentsData.documentSelect == null) {
            alert("Odaberite dokument!");
            return;
        }
        if ($scope.documentsData.documentSelect == 'Primka')
            getPrimka();
        else if ($scope.documentsData.documentSelect == 'Izdatnica')
            getIzdatnica();
        else if ($scope.documentsData.documentSelect == 'Pocetno stanje')
            getPocetnoStanje();
        else if ($scope.documentsData.documentSelect == 'Inventura/Visak')
            getInventurniVisak();
        else if ($scope.documentsData.documentSelect == 'Inventura/Manjak')
            getInventurniManjak();
        else if ($scope.documentsData.documentSelect == 'Visak/Manjak')
            getVisakManjak();
       }
  

    var getPrimka = function()
    {
         startDate = $scope.documentsData.documentsFrom.getDate() + "/" + ($scope.documentsData.documentsFrom.getMonth()+1) + "/" + $scope.documentsData.documentsFrom.getFullYear();
         endDate = $scope.documentsData.documentsTo.getDate() + "/" + ($scope.documentsData.documentsTo.getMonth()+1) + "/" + $scope.documentsData.documentsTo.getFullYear();
         var promiseGetData = SifarniciService.getItem('api/DijagramiAPI/GetPrimka?startDate=' +startDate + '&endDate=' + endDate);
         promiseGetData.then(function (pl) {
           
            $timeout(function () {
                $scope.isChartReady = true;
            });

            $scope.myDataSource.data[0].label = "Primka";
            $scope.myDataSource.data[1].label = "Storno primka";
            $scope.myDataSource.data[0].value = pl.data.brojDokumenata;
            $scope.myDataSource.data[1].value = pl.data.brojStornihDokumenata;
            $scope.myDataSource.chart.caption = "Dijagram primki i stornih primki";
            $scope.myDataSource.chart.subcaption = "Od " + startDate + " do " + endDate;

            if (pl.data.brojDokumenata == 0 && pl.data.brojStornihDokumenata == 0)
                $scope.myDataSource.chart.caption = "Ne postoje zapisi za odabrani period";

        },
              function (errorPl) {
                  alert("Ne postoje primke i storne primke u tom periodu");
                  $timeout(function () {
                      $scope.isChartReady = false;
                  });;

              })
        .then(function () {
            $scope.isBusy = false;
        });
    }

    var getIzdatnica = function()
    {
        startDate = $scope.documentsData.documentsFrom.getDate() + "/" + ($scope.documentsData.documentsFrom.getMonth() + 1) + "/" + $scope.documentsData.documentsFrom.getFullYear();
        endDate = $scope.documentsData.documentsTo.getDate() + "/" + ($scope.documentsData.documentsTo.getMonth() + 1) + "/" + $scope.documentsData.documentsTo.getFullYear();
        var promiseGetData = SifarniciService.getItem('api/DijagramiAPI/GetIzdatnica?startDate=' + startDate + '&endDate=' + endDate + '&dummy=1');
        promiseGetData.then(function (pl) {

            $timeout(function () {
                $scope.isChartReady = true;
            });

            $scope.myDataSource.data[0].label = "Izdatnica";
            $scope.myDataSource.data[1].label = "Storno izdatnica";
            $scope.myDataSource.data[0].value = pl.data.brojDokumenata;
            $scope.myDataSource.data[1].value = pl.data.brojStornihDokumenata;
            $scope.myDataSource.chart.caption = "Dijagram izdatnica i stornih izdatnica";
            $scope.myDataSource.chart.subcaption = "Od " + startDate + " do " + endDate;

            if (pl.data.brojDokumenata == 0 && pl.data.brojStornihDokumenata == 0)
                $scope.myDataSource.chart.caption = "Ne postoje zapisi za odabrani period";

        },
             function (errorPl) {
                 alert("Ne postoje izdatnice i storne izdatnice u tom periodu");
                 $timeout(function () {
                     $scope.isChartReady = false;
                 });;

             })
       .then(function () {
           $scope.isBusy = false;
       });
    }

    var getPocetnoStanje = function () {
        startDate = $scope.documentsData.documentsFrom.getDate() + "/" + ($scope.documentsData.documentsFrom.getMonth() + 1) + "/" + $scope.documentsData.documentsFrom.getFullYear();
        endDate = $scope.documentsData.documentsTo.getDate() + "/" + ($scope.documentsData.documentsTo.getMonth() + 1) + "/" + $scope.documentsData.documentsTo.getFullYear();
        var promiseGetData = SifarniciService.getItem('api/DijagramiAPI/GetPocetnoStanje?startDate=' + startDate + '&endDate=' + endDate + '&dummy=1');
        promiseGetData.then(function (pl) {

            $timeout(function () {
                $scope.isChartReady = true;
            });

            $scope.myDataSource.data[0].label = "Pocetno stanje";
            $scope.myDataSource.data[1].label = "Storno pocetno stanje";
            $scope.myDataSource.data[0].value = pl.data.brojDokumenata;
            $scope.myDataSource.data[1].value = pl.data.brojStornihDokumenata;
            $scope.myDataSource.chart.caption = "Dijagram pocetnih stanja i stornih pocetnih stanja";
            $scope.myDataSource.chart.subcaption = "Od " + startDate + " do " + endDate;

            if (pl.data.brojDokumenata == 0 && pl.data.brojStornihDokumenata == 0)
                $scope.myDataSource.chart.caption = "Ne postoje zapisi za odabrani period";

        },
             function (errorPl) {
                 alert("Ne postoje pocetna stanja i storna pocetna stanja u tom periodu");
                 $timeout(function () {
                     $scope.isChartReady = false;
                 });;

             })
       .then(function () {
           $scope.isBusy = false;
       });
    }

    var getInventurniVisak = function () {
        startDate = $scope.documentsData.documentsFrom.getDate() + "/" + ($scope.documentsData.documentsFrom.getMonth() + 1) + "/" + $scope.documentsData.documentsFrom.getFullYear();
        endDate = $scope.documentsData.documentsTo.getDate() + "/" + ($scope.documentsData.documentsTo.getMonth() + 1) + "/" + $scope.documentsData.documentsTo.getFullYear();
        var promiseGetData = SifarniciService.getItem('api/DijagramiAPI/GetInventurniVisak?startDate=' + startDate + '&endDate=' + endDate + '&dummy=1');
        promiseGetData.then(function (pl) {

            $timeout(function () {
                $scope.isChartReady = true;
            });

            $scope.myDataSource.data[0].label = "Inventura";
            $scope.myDataSource.data[1].label = "Inventurni visak";
            $scope.myDataSource.data[0].value = pl.data.brojDokumenata;
            $scope.myDataSource.data[1].value = pl.data.brojStornihDokumenata;
            $scope.myDataSource.chart.caption = "Dijagram inventura i inventurnih viskova";
            $scope.myDataSource.chart.subcaption = "Od " + startDate + " do " + endDate;

            if (pl.data.brojDokumenata == 0 && pl.data.brojStornihDokumenata == 0)
                $scope.myDataSource.chart.caption = "Ne postoje zapisi za odabrani period";

        },
             function (errorPl) {
                 alert("Ne postoje inventure i inventurni viskovi u tom periodu");
                 $timeout(function () {
                     $scope.isChartReady = false;
                 });;

             })
       .then(function () {
           $scope.isBusy = false;
       });

        var getInventurniManjak = function () {
        startDate = $scope.documentsData.documentsFrom.getDate() + "/" + ($scope.documentsData.documentsFrom.getMonth() + 1) + "/" + $scope.documentsData.documentsFrom.getFullYear();
        endDate = $scope.documentsData.documentsTo.getDate() + "/" + ($scope.documentsData.documentsTo.getMonth() + 1) + "/" + $scope.documentsData.documentsTo.getFullYear();
        var promiseGetData = SifarniciService.getItem('api/DijagramiAPI/GetInventurniManjak?startDate=' + startDate + '&endDate=' + endDate + '&dummy=1');
        promiseGetData.then(function (pl) {

            $timeout(function () {
                $scope.isChartReady = true;
            });

            $scope.myDataSource.data[0].label = "Inventura";
            $scope.myDataSource.data[1].label = "Inventurni manjak";
            $scope.myDataSource.data[0].value = pl.data.brojDokumenata;
            $scope.myDataSource.data[1].value = pl.data.brojStornihDokumenata;
            $scope.myDataSource.chart.caption = "Dijagram inventura i inventurnih manjkova";
            $scope.myDataSource.chart.subcaption = "Od " + startDate + " do " + endDate;

            if (pl.data.brojDokumenata == 0 && pl.data.brojStornihDokumenata == 0)
                $scope.myDataSource.chart.caption = "Ne postoje zapisi za odabrani period";

        },
             function (errorPl) {
                 alert("Ne postoje inventure i inventurni manjkovi u tom periodu");
                 $timeout(function () {
                     $scope.isChartReady = false;
                 });;

             })
       .then(function () {
           $scope.isBusy = false;
       });
    }

    var getVisakManjak = function () {
        startDate = $scope.documentsData.documentsFrom.getDate() + "/" + ($scope.documentsData.documentsFrom.getMonth() + 1) + "/" + $scope.documentsData.documentsFrom.getFullYear();
        endDate = $scope.documentsData.documentsTo.getDate() + "/" + ($scope.documentsData.documentsTo.getMonth() + 1) + "/" + $scope.documentsData.documentsTo.getFullYear();
        var promiseGetData = SifarniciService.getItem('api/DijagramiAPI/GetInventurniVisakManjak?startDate=' + startDate + '&endDate=' + endDate + '&dummy=1');
        promiseGetData.then(function (pl) {

            $timeout(function () {
                $scope.isChartReady = true;
            });

            $scope.myDataSource.data[0].label = "Inventurni visak";
            $scope.myDataSource.data[1].label = "Inventurni manjak";
            $scope.myDataSource.data[0].value = pl.data.brojDokumenata;
            $scope.myDataSource.data[1].value = pl.data.brojStornihDokumenata;
            $scope.myDataSource.chart.caption = "Dijagram inventurnih viskova i inventurnih manjkova";
            $scope.myDataSource.chart.subcaption = "Od " + startDate + " do " + endDate;

            if (pl.data.brojDokumenata == 0 && pl.data.brojStornihDokumenata == 0)
                $scope.myDataSource.chart.caption = "Ne postoje zapisi za odabrani period";

        },
             function (errorPl) {
                 alert("Ne postoje inventurni viskovi i inventurni manjkovi u tom periodu");
                 $timeout(function () {
                     $scope.isChartReady = false;
                 });;

             })
       .then(function () {
           $scope.isBusy = false;
       });
    }

    var getInventurniManjak = function () {
        startDate = $scope.documentsData.documentsFrom.getDate() + "/" + ($scope.documentsData.documentsFrom.getMonth() + 1) + "/" + $scope.documentsData.documentsFrom.getFullYear();
        endDate = $scope.documentsData.documentsTo.getDate() + "/" + ($scope.documentsData.documentsTo.getMonth() + 1) + "/" + $scope.documentsData.documentsTo.getFullYear();
        var promiseGetData = SifarniciService.getItem('api/DijagramiAPI/GetInventurniManjak?startDate=' + startDate + '&endDate=' + endDate + '&dummy=1');
        promiseGetData.then(function (pl) {

            $timeout(function () {
                $scope.isChartReady = true;
            });

            $scope.myDataSource.data[0].label = "Inventura";
            $scope.myDataSource.data[1].label = "Inventurni manjak";
            $scope.myDataSource.data[0].value = pl.data.brojDokumenata;
            $scope.myDataSource.data[1].value = pl.data.brojStornihDokumenata;
            $scope.myDataSource.chart.caption = "Dijagram inventura i inventurnih manjkova";
            $scope.myDataSource.chart.subcaption = "Od " + startDate + " do " + endDate;

            if (pl.data.brojDokumenata == 0 && pl.data.brojStornihDokumenata == 0)
                $scope.myDataSource.chart.caption = "Ne postoje zapisi za odabrani period";

        },
             function (errorPl) {
                 alert("Ne postoje inventure i inventurni manjkovi u tom periodu");
                 $timeout(function () {
                     $scope.isChartReady = false;
                 });;

             })
       .then(function () {
           $scope.isBusy = false;
       });
    }

    var getVisakManjak = function () {
        startDate = $scope.documentsData.documentsFrom.getDate() + "/" + ($scope.documentsData.documentsFrom.getMonth() + 1) + "/" + $scope.documentsData.documentsFrom.getFullYear();
        endDate = $scope.documentsData.documentsTo.getDate() + "/" + ($scope.documentsData.documentsTo.getMonth() + 1) + "/" + $scope.documentsData.documentsTo.getFullYear();
        var promiseGetData = SifarniciService.getItem('api/DijagramiAPI/GetInventurniVisakManjak?startDate=' + startDate + '&endDate=' + endDate + '&dummy=1');
        promiseGetData.then(function (pl) {

            $timeout(function () {
                $scope.isChartReady = true;
            });

            $scope.myDataSource.data[0].label = "Inventurni visak";
            $scope.myDataSource.data[1].label = "Inventurni manjak";
            $scope.myDataSource.data[0].value = pl.data.brojDokumenata;
            $scope.myDataSource.data[1].value = pl.data.brojStornihDokumenata;
            $scope.myDataSource.chart.caption = "Dijagram inventurnih viskova i inventurnih manjkova";
            $scope.myDataSource.chart.subcaption = "Od " + startDate + " do " + endDate;

            if (pl.data.brojDokumenata == 0 && pl.data.brojStornihDokumenata == 0)
                $scope.myDataSource.chart.caption = "Ne postoje zapisi za odabrani period";

        },
             function (errorPl) {
                 alert("Ne postoje inventurni viskovi i inventurni manjkovi u tom periodu");
                 $timeout(function () {
                     $scope.isChartReady = false;
                 });;

             })
       .then(function () {
           $scope.isBusy = false;
       });
    }
    }

}]);