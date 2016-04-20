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
    $scope.showStavke = function (model, index) {
        DokumentiService.getStavke('/api/PrimkaAPI', $scope.collection[index].id, model).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.collection[index].stavke = [];
            $scope.collection[index].stavke = response;
            $scope.collection[index].isStavkeShown = !$scope.collection[index].isStavkeShown;
        });
    };
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

app.controller('IzdatnicaController', function ($scope, $location, DokumentiService, DokumentiGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/IzdatnicaAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Dokumenti/Izdatnica/AddIzdatnica"); }
    $scope.showStavke = function (model, index) {
        DokumentiService.getStavke('/api/IzdatnicaAPI', $scope.collection[index].id, model).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.collection[index].stavke = [];
            $scope.collection[index].stavke = response;
            $scope.collection[index].isStavkeShown = !$scope.collection[index].isStavkeShown;
        });
    };
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
    $scope.showStavke = function (model, index) {
        DokumentiService.getStavke('/api/PocetnoStanjeAPI', $scope.collection[index].id, model).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.collection[index].stavke = [];
            $scope.collection[index].stavke = response;
            $scope.collection[index].isStavkeShown = !$scope.collection[index].isStavkeShown;
        });
    };
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

app.controller('InventuraController', function ($scope, $location, DokumentiService, DokumentiGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/InventuraAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Dokumenti/Inventura/AddInventura"); }
    $scope.showStavke = function (model, index) {
        DokumentiService.getStavke('/api/InventuraAPI', $scope.collection[index].id, model).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.collection[index].stavke = [];
            $scope.collection[index].stavke = response;
            $scope.collection[index].isStavkeShown = !$scope.collection[index].isStavkeShown;
        });
    };
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

app.controller('InventurniVisakController', function ($scope, $location, DokumentiService, DokumentiGetAllFactory, ShareData) {
    loadData();
    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/InventurniVisakAPI'); }
    $scope.showStavke = function (model, index) {
        DokumentiService.getStavke('/api/InventurniVisakAPI', $scope.collection[index].id, model).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.collection[index].stavke = [];
            $scope.collection[index].stavke = response;
            $scope.collection[index].isStavkeShown = !$scope.collection[index].isStavkeShown;
        });
    };
});

app.controller('InventurniManjakController', function ($scope, $location, DokumentiService, DokumentiGetAllFactory, ShareData) {
    loadData();
    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/InventurniManjakAPI'); }
    $scope.showStavke = function (model, index) {
        DokumentiService.getStavke('/api/InventurniManjakAPI', $scope.collection[index].id, model).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.collection[index].stavke = [];
            $scope.collection[index].stavke = response;
            $scope.collection[index].isStavkeShown = !$scope.collection[index].isStavkeShown;
        });
    };
});

app.controller('StornoPrimkaController', function ($scope, $location, DokumentiService, DokumentiGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/StornoPrimkaAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Dokumenti/StornoPrimka/AddStornoPrimka"); }
    $scope.showStavke = function (model, index) {
        DokumentiService.getStavke('/api/StornoPrimkaAPI', $scope.collection[index].id, model).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.collection[index].stavke = [];
            $scope.collection[index].stavke = response;
            $scope.collection[index].isStavkeShown = !$scope.collection[index].isStavkeShown;
        });
    };
});
app.controller('AddStornoPrimkaController', function ($scope, $location, $http, DokumentiService, DokumentiCreateFactory, SifarniciService, SifarniciGetAllFactory, ZaliheService, ShareData, ngAuthSettings) {

    $scope.back = function () { $location.path("/Dokumenti/StornoPrimka"); }
    $scope.id = 0;
    $scope.stavke = [];
    $scope.maxDate = new Date();
    $scope.stornoPrimka = {
        dostavnica: null,
        skladiste: null,
        dobavljac: null,
        skladisteNaziv: null,
        dobavljacNaziv: null,
        povrat: null,
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

    $http.get(ngAuthSettings.apiServiceBaseUri + '/api/PrimkaAPI?dummy1=1&dummy2=2&dummy3=3').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.primkeZaStorno = response;
    });

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var finalDocument = {
            master: $scope.stornoPrimka,
            detail: $scope.stavke
        };
        DokumentiCreateFactory($scope, "/api/StornoPrimkaAPI", "/Dokumenti/StornoPrimka", finalDocument);
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
        ZaliheService.getItem("/api/ZaliheAPI", $scope.stavke[index].proizvod, $scope.stornoPrimka.skladiste).then(function (pl) {
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

    $scope.setMasterAndStavke = function () {
        DokumentiService.getItemId('/api/PrimkaAPI', $scope.stornoPrimka.povrat).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            console.log(response);
            $scope.stornoPrimka.dostavnica = response.dostavnica;
            $scope.stornoPrimka.skladiste = response.skladiste;
            $scope.stornoPrimka.dobavljac = response.dobavljac;
            $scope.stornoPrimka.broj_primke = response.broj_primke;
            $scope.stornoPrimka.datum = new Date(response.datum);
            $scope.stornoPrimka.opis = response.opis;
            $scope.stornoPrimka.dobavljacNaziv = response.dobavljacNaziv;
            $scope.stornoPrimka.skladisteNaziv = response.skladisteNaziv;
        });
        DokumentiService.getStavke('/api/StornoPrimkaAPI', $scope.stornoPrimka.povrat, 'Ulaz').then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.stavke = response;
            $scope.stavke.forEach(function (val) {
                val.kolicina = val.kolicina * -1;
            });
        });
    };

});

app.controller('StornoPocetnoStanjeController', function ($scope, $location, DokumentiService, DokumentiGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/StornoPocetnoStanjeAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Dokumenti/StornoPocetnoStanje/AddStornoPocetnoStanje"); }
    $scope.showStavke = function (model, index) {
        DokumentiService.getStavke('/api/StornoPocetnoStanjeAPI', $scope.collection[index].id, model).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.collection[index].stavke = [];
            $scope.collection[index].stavke = response;
            $scope.collection[index].isStavkeShown = !$scope.collection[index].isStavkeShown;
        });
    };
});
app.controller('AddStornoPocetnoStanjeController', function ($scope, $location, $http, DokumentiService, DokumentiCreateFactory, SifarniciService, SifarniciGetAllFactory, ZaliheService, ShareData, ngAuthSettings) {

    $scope.back = function () { $location.path("/Dokumenti/StornoPocetnoStanje"); }
    $scope.id = 0;
    $scope.stavke = [];
    $scope.maxDate = new Date();
    $scope.stornoPocetnoStanje = {
        dostavnica: null,
        skladiste: null,
        dobavljac: null,
        skladisteNaziv: null,
        dobavljacNaziv: null,
        povrat: null,
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

    $http.get(ngAuthSettings.apiServiceBaseUri + '/api/PocetnoStanjeAPI?dummy1=1&dummy2=2&dummy3=3').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.primkeZaStorno = response;
    });

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var finalDocument = {
            master: $scope.stornoPocetnoStanje,
            detail: $scope.stavke
        };
        DokumentiCreateFactory($scope, "/api/StornoPocetnoStanjeAPI", "/Dokumenti/StornoPocetnoStanje", finalDocument);
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
        ZaliheService.getItem("/api/ZaliheAPI", $scope.stavke[index].proizvod, $scope.stornoPrimka.skladiste).then(function (pl) {
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

    $scope.setMasterAndStavke = function () {
        DokumentiService.getItemId('/api/PocetnoStanjeAPI', $scope.stornoPocetnoStanje.povrat).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            console.log(response);
            $scope.stornoPocetnoStanje.dostavnica = response.dostavnica;
            $scope.stornoPocetnoStanje.skladiste = response.skladiste;
            $scope.stornoPocetnoStanje.dobavljac = response.dobavljac;
            $scope.stornoPocetnoStanje.broj_primke = response.broj_primke;
            $scope.stornoPocetnoStanje.datum = new Date(response.datum);
            $scope.stornoPocetnoStanje.opis = response.opis;
            $scope.stornoPocetnoStanje.dobavljacNaziv = response.dobavljacNaziv;
            $scope.stornoPocetnoStanje.skladisteNaziv = response.skladisteNaziv;
        });
        DokumentiService.getStavke('/api/StornoPocetnoStanjeAPI', $scope.stornoPocetnoStanje.povrat, 'Ulaz').then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.stavke = response;
            $scope.stavke.forEach(function (val) {
                val.kolicina = val.kolicina * -1;
            });
        });
    };

});

app.controller('StornoIzdatnicaController', function ($scope, $location, DokumentiService, DokumentiGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { DokumentiGetAllFactory($scope, '/api/StornoIzdatnicaAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Dokumenti/StornoIzdatnica/AddStornoIzdatnica"); }
    $scope.showStavke = function (model, index) {
        DokumentiService.getStavke('/api/StornoIzdatnicaAPI', $scope.collection[index].id, model).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.collection[index].stavke = [];
            $scope.collection[index].stavke = response;
            $scope.collection[index].isStavkeShown = !$scope.collection[index].isStavkeShown;
        });
    };
});
app.controller('AddStornoIzdatnicaController', function ($scope, $location, $http, DokumentiService, DokumentiCreateFactory, SifarniciService, SifarniciGetAllFactory, ZaliheService, ShareData, ngAuthSettings) {

    $scope.back = function () { $location.path("/Dokumenti/StornoIzdatnica"); }
    $scope.id = 0;
    $scope.stavke = [];
    $scope.maxDate = new Date();
    $scope.stornoIzdatnica = {
        skladiste: null,
        dobavljac: null,
        skladisteNaziv: null,
        dobavljacNaziv: null,
        povrat: null,
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

    $http.get(ngAuthSettings.apiServiceBaseUri + '/api/IzdatnicaAPI?dummy1=1&dummy2=2&dummy3=3').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.primkeZaStorno = response;
    });

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var finalDocument = {
            master: $scope.stornoIzdatnica,
            detail: $scope.stavke
        };
        DokumentiCreateFactory($scope, "/api/StornoIzdatnicaAPI", "/Dokumenti/StornoIzdatnica", finalDocument);
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
        ZaliheService.getItem("/api/ZaliheAPI", $scope.stavke[index].proizvod, $scope.stornoPrimka.skladiste).then(function (pl) {
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

    $scope.setMasterAndStavke = function () {
        DokumentiService.getItemId('/api/IzdatnicaAPI', $scope.stornoIzdatnica.povrat).then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            console.log(response);
            $scope.stornoIzdatnica.skladiste = response.skladiste;
            $scope.stornoIzdatnica.dobavljac = response.dobavljac;
            $scope.stornoIzdatnica.broj_primke = response.broj_primke;
            $scope.stornoIzdatnica.datum = new Date(response.datum);
            $scope.stornoIzdatnica.opis = response.opis;
            $scope.stornoIzdatnica.dobavljacNaziv = response.dobavljacNaziv;
            $scope.stornoIzdatnica.skladisteNaziv = response.skladisteNaziv;
        });
        DokumentiService.getStavke('/api/StornoIzdatnicaAPI', $scope.stornoIzdatnica.povrat, 'Izlaz').then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.stavke = response;
            $scope.stavke.forEach(function (val) {
                val.kolicina = val.kolicina * -1;
            });
        });
    };

});