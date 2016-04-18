//DokumentiControllers.js

//Controller za HomePage od dokumenata
app.controller('DokumentiController', function ($scope, $location, DokumentiService, ShareData) {

});

app.controller('PrimkaController', function ($scope, $location, DokumentiService, DokumentiGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/PrimkaAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Dokumenti/Primka/AddPrimka"); }
});
app.controller('AddPrimkaController', function ($scope, $location, DokumentiService, DokumentiCreateFactory, SifarniciService, SifarniciGetAllFactory, ZaliheService, ShareData) {

    $scope.back = function () { $location.path("/Dokumenti/Primka"); }
    $scope.id = 0;
    $scope.stavke = [];
    $scope.maxDate = new Date();
    $scope.primka = {
        dostavnica: null,
        skladiste: null,
        dobavljac: null,
        broj_primke: null,
        datum: new Date(),
        opis: null
    };
    $scope.ukupno = 0;
    $scope.Math = window.Math;
    $scope.dateFormat = 'dd.MM.yyyy';
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(),
        startingDay: 1
    };
    $scope.isOpen = false;

    SifarniciService.getItem('/api/ProizvodiAPI').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.proizvodi = response;
    }, function (errorPl) {
              $scope.error = 'Greška tokom učitavanja podataka', errorPl;
    });

    SifarniciService.getItem('/api/SubjektiAPI').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.subjekti = response;
        console.log($scope.subjekti);
    }, function (errorPl) {
        $scope.error = 'Greška tokom učitavanja podataka', errorPl;
    });

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var finalDocument = {
            master: $scope.primka,
            detail: $scope.stavke
        };
        DokumentiCreateFactory($scope, "/api/PrimkaAPI", "/Dokumenti/Primka", finalDocument);
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
        ZaliheService.getItem("/api/ZaliheAPI", $scope.stavke[index].proizvod, $scope.primka.skladiste).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data))[0];
            console.log(response);
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

    $scope.openPopup = function () {
        $scope.isOpen = !$scope.isOpen;
    };

    $scope.formatDate = function (date) {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    };

});

app.controller('IzdatnicaController', function ($scope, $location, DokumentiGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/IzdatnicaAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Dokumenti/Izdatnica/AddIzdatnica"); }
});
app.controller('AddIzdatnicaController', function ($scope, $location, $http, DokumentiService, DokumentiCreateFactory, SifarniciService, SifarniciGetAllFactory, ZaliheService, ngAuthSettings, ShareData) {

    $scope.back = function () { $location.path("/Dokumenti/Izdatnica"); }
    $scope.id = 0;
    $scope.stavke = [];
    $scope.maxDate = new Date();
    $scope.izdatnica = {
        dostavnica: null,
        skladiste: null,
        dobavljac: null,
        broj_primke: null,
        datum: new Date(),
        opis: null
    };
    $scope.ukupno = 0;
    $scope.Math = window.Math;
    $scope.dateFormat = 'dd.MM.yyyy';
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(),
        startingDay: 1
    };
    $scope.isOpen = false;

    SifarniciService.getItem('/api/ProizvodiAPI').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.proizvodi = response;
    }, function (errorPl) {
        $scope.error = 'Greška tokom učitavanja podataka', errorPl;
    });

    SifarniciService.getItem('/api/SubjektiAPI').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.subjekti = response;
        console.log($scope.subjekti);
    }, function (errorPl) {
        $scope.error = 'Greška tokom učitavanja podataka', errorPl;
    });

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var finalDocument = {
            master: $scope.izdatnica,
            detail: $scope.stavke
        };
        DokumentiCreateFactory($scope, "/api/IzdatnicaAPI", "/Dokumenti/Izdatnica", finalDocument);
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
        ZaliheService.getItem("/api/ZaliheAPI", $scope.stavke[index].proizvod, $scope.izdatnica.skladiste).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data))[0];
            console.log(response);
            $scope.stavke[index].cijena = response.cijena;
            $scope.stavke[index].stanje = response.stanje;
        });
    };

    $scope.getProizvodiSkladiste = function (skladiste) {
        $http.get(ngAuthSettings.apiServiceBaseUri + '/api/ProizvodiAPI?subjekt=' + skladiste + '&dummy=1').then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            console.log(response);
            $scope.proizvodi = response;
        });
    };

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

    $scope.openPopup = function () {
        $scope.isOpen = !$scope.isOpen;
    };

    $scope.formatDate = function (date) {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    };

});

app.controller('PocetnoStanjeController', function ($scope, $location, DokumentiService, DokumentiGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/PocetnoStanjeAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Dokumenti/PocetnoStanje/AddPocetnoStanje"); }
});
app.controller('AddPocetnoStanjeController', function ($scope, $location, DokumentiService, DokumentiCreateFactory, SifarniciService, SifarniciGetAllFactory, ZaliheService, ShareData) {

    $scope.back = function () { $location.path("/Dokumenti/PocetnoStanje"); }
    $scope.id = 0;
    $scope.stavke = [];
    $scope.maxDate = new Date();
    $scope.pocetnoStanje = {
        dostavnica: null,
        skladiste: null,
        dobavljac: null,
        broj_primke: null,
        datum: new Date(),
        opis: null
    };
    $scope.ukupno = 0;
    $scope.Math = window.Math;
    $scope.dateFormat = 'dd.MM.yyyy';
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(),
        startingDay: 1
    };
    $scope.isOpen = false;

    SifarniciService.getItem('/api/ProizvodiAPI').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.proizvodi = response;
    }, function (errorPl) {
        $scope.error = 'Greška tokom učitavanja podataka', errorPl;
    });

    SifarniciService.getItem('/api/SubjektiAPI').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.subjekti = response;
        console.log($scope.subjekti);
    }, function (errorPl) {
        $scope.error = 'Greška tokom učitavanja podataka', errorPl;
    });

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var finalDocument = {
            master: $scope.pocetnoStanje,
            detail: $scope.stavke
        };
        DokumentiCreateFactory($scope, "/api/PocetnoStanjeAPI", "/Dokumenti/PocetnoStanje", finalDocument);
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
        ZaliheService.getItem("/api/ZaliheAPI", $scope.stavke[index].proizvod, $scope.pocetnoStanje.skladiste).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data))[0];
            console.log(response);
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

    $scope.openPopup = function () {
        $scope.isOpen = !$scope.isOpen;
    };

    $scope.formatDate = function (date) {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    };

});

app.controller('InventuraController', function ($scope, $location, DokumentiGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/InventuraAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Dokumenti/Inventura/AddInventura"); }
});
app.controller('AddInventuraController', function ($scope, $location, $http, DokumentiService, DokumentiCreateFactory, SifarniciService, SifarniciGetAllFactory, ZaliheService, ngAuthSettings, ShareData) {

    $scope.back = function () { $location.path("/Dokumenti/Inventura"); }
    $scope.id = 0;
    $scope.stavke = [];
    $scope.maxDate = new Date();
    $scope.inventura = {
        skladiste: null,
        broj_inventure: null,
        datum: new Date(),
        opis: null
    };
    $scope.ukupno = 0;
    $scope.Math = window.Math;
    $scope.dateFormat = 'dd.MM.yyyy';
    $scope.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(),
        startingDay: 1
    };
    $scope.isOpen = false;

    SifarniciService.getItem('/api/ProizvodiAPI').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.proizvodi = response;
    }, function (errorPl) {
        $scope.error = 'Greška tokom učitavanja podataka', errorPl;
    });

    SifarniciService.getItem('/api/SubjektiAPI').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.subjekti = response;
        console.log($scope.subjekti);
    }, function (errorPl) {
        $scope.error = 'Greška tokom učitavanja podataka', errorPl;
    });

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var finalDocument = {
            master: $scope.inventura,
            detail: $scope.stavke
        };
        DokumentiCreateFactory($scope, "/api/InventuraAPI", "/Dokumenti/Inventura", finalDocument);
    };

    $scope.addStavka = function (p_redniBroj, p_proizvod, p_cijena, p_stanje, p_jedinicaMjere, p_kolicina, p_sifra_jmjere) {
        $scope.stavke.push({
            redni_broj: $scope.stavke.length + 1,
            proizvod: p_proizvod,
            cijena: p_cijena,
            stanje: p_stanje,
            jedinica_mjere: p_jedinicaMjere,
            kolicina: p_kolicina,
            stanje: p_stanje,
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
        ZaliheService.getItem("/api/ZaliheAPI", $scope.stavke[index].proizvod, $scope.inventura.skladiste).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data))[0];
            console.log(response);
            $scope.stavke[index].cijena = response.cijena;
            $scope.stavke[index].stanje = response.stanje;
        });
    };

    $scope.getProizvodiSkladiste = function (skladiste) {
        $http.get(ngAuthSettings.apiServiceBaseUri + '/api/ProizvodiAPI?subjekt=' + skladiste + '&dummy=1').then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            console.log(response);
            $scope.proizvodi = response;
        });
    };

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

    $scope.openPopup = function () {
        $scope.isOpen = !$scope.isOpen;
    };

    $scope.formatDate = function (date) {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    };

});