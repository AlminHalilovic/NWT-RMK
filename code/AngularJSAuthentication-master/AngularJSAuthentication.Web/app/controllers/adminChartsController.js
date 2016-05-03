'use strict';
app.controller('adminChartsController', ['$scope', '$location', '$timeout', 'authService', '$routeParams','SifarniciService','$rootScope', function ($scope, $location, $timeout, authService, $routeParams,SifarniciService,$rootScope) {

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
    

}]);