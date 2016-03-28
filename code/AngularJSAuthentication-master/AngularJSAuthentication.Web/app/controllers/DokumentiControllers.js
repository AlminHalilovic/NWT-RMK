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
app.controller('AddPrimkaController', function ($scope, $location, DokumentiService, DokumentiCreateFactory, SifarniciService, SifarniciGetAllFactory, ShareData) {

    $scope.back = function () { $location.path("/Dokumenti/Primka"); }
    $scope.id = 0;
    $scope.stavke = [];

    SifarniciService.getItem('/api/ProizvodiAPI').then(function (pl) {
        $scope.proizvodi = pl.data;
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
        console.log($scope.stavke);
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
        DokumentiService.getJmjere('/api/ProizvodiAPI', $scope.stavke[index].proizvod).then(function (pl) {
            $scope.stavke[index].sifra_jmjere = pl.data[1];
            $scope.stavke[index].jedinica_mjere = pl.data[0];
        });
    };

    $scope.removeStavka = function (index) {
        $scope.stavke.splice(index, 1);
        DokumentiService.recalculateOrdinals($scope.stavke);
    };
});