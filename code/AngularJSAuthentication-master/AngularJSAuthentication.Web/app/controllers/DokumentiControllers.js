//DokumentiControllers.js

//Controller za HomePage od dokumenata
app.controller('DokumentiController', function ($scope, $location, DokumentiService, ShareData) {

});

app.controller('PrimkaController', function ($scope, $location, DokumentiGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/PrimkaAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Primka/AddPrimka"); }
});
app.controller('AddPrimkaController', function ($scope, $location, DokumentiService, DokumentiCreateFactory, SifarniciService, SifarniciGetAllFactory, ZaliheService, ShareData) {

    $scope.back = function () { $location.path("/Dokumenti/Primka"); }
    $scope.id = 0;
    $scope.stavke = [];
    $scope.primka = {
        dostavnica: null,
        organizacija: null,
        dobavljac: null,
        broj_primke: null,
        datum: null,
        opis: null
    };
    $scope.ukupno = 0;
    $scope.Math = window.Math;

    SifarniciService.getItem('/api/ProizvodiAPI').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.proizvodi = response;
    }, function (errorPl) {
              $scope.error = 'Greška tokom učitavanja podataka', errorPl;
    });

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        //var Item = { sifra: $scope.sifra, naziv: $scope.naziv };
        var Item = { broj_primke: $scope.broj_primke, dostavnica: $scope.dostavnica, datum: $scope.datum, opis: $scope.opis };
        DokumentiCreateFactory($scope, "/api/PrimkaAPI", "/Dokumenti/Primka", Item);
    };

    $scope.addStavka = function (p_redniBroj, p_proizvod, p_cijena, p_stanje, p_jedinicaMjere, p_kolicina, p_sifra_jmjere) {
        $scope.stavke.push({  
            redni_broj: $scope.stavke.length + 1, 
            proizvod: p_proizvod, 
            cijena: p_cijena,      
            stanje: p_stanje,      
            jedinica_mjere: p_jedinicaMjere, 
            kolicina: p_kolicina,
            sifra_jmjere: p_sifra_jmjere
        });
    };

    $scope.getJmjere = function (index) {
        SifarniciService.getItemId("/api/ProizvodiAPI", $scope.stavke[index].proizvod).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data))[0];
            $scope.stavke[index].sifra_jmjere = response.sifra_jmjere;
            $scope.stavke[index].jedinica_mjere = response.id_jmjere;
        });
    };

    $scope.getZalihe = function (index) {
        ZaliheService.getItem("/api/ZaliheAPI", $scope.stavke[index].proizvod, $scope.primka.organizacija).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data))[0];
            $scope.stavke[index].cijena = response.cijena;
            $scope.stavke[index].stanje = response.stanje;
        });
    }

    $scope.getProizvodData = function (index) {
        $scope.getJmjere(index);
        $scope.getZalihe(index);
        $scope.calculateTotal();
    };

    $scope.removeStavka = function (index) {
        $scope.stavke.splice(index, 1);
        DokumentiService.recalculateOrdinals($scope.stavke);
        $scope.ukupno = DokumentiService.calculateTotal($scope.stavke);
    };

    $scope.calculateTotal = function () {
        $scope.ukupno = DokumentiService.calculateTotal($scope.stavke);
    }
});