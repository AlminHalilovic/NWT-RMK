//SifarniciControllers.js


//Controller za HomePage od sifarnika
app.controller('SifarniciController', function ($scope, $location, SifarniciService, ShareData) {

});

//Controlleri za sifarnik jedinice mjera
app.controller('JediniceMjeraController', function ($scope, $location,SifarniciGetAllFactory ,ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope,'/api/JediniceMjereAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () {  $location.path("/Sifarnici/AddJediniceMjera"); }
    $scope.editItem = function (id) {ShareData.value = id; $location.path("/Sifarnici/EditJediniceMjera/" + id);}
    $scope.deleteItem = function (id) { ShareData.value = id;  $location.path("/Sifarnici/DeleteJediniceMjera/" + id);}

});
app.controller('AddJediniceMjeraController', function ($scope, $location, SifarniciService,SifarniciCreateFactory, ShareData) {

    $scope.back = function () { $location.path("/Sifarnici/JediniceMjera");}
    $scope.id = 0;

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function ()
    {
    var Item = { sifra: $scope.sifra, naziv: $scope.naziv };
    SifarniciCreateFactory($scope, "/api/JediniceMjereAPI", "/Sifarnici/JediniceMjera", Item);
    }
});
app.controller("EditJediniceMjeraController", function ($scope, $location, ShareData, SifarniciGetByIdFactory,SifarniciUpdateFactory) {

    getJediniceMjera();
    function getJediniceMjera() { SifarniciGetByIdFactory($scope, "/api/JediniceMjereAPI");}
    $scope.back = function () { $location.path("/Sifarnici/JediniceMjera/");}

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var Item = {
            ID: $scope.Item.id,
            SIFRA: $scope.Item.sifra,
            NAZIV: $scope.Item.naziv
        };
        SifarniciUpdateFactory($scope, "/api/JediniceMjereAPI", "/Sifarnici/JediniceMjera", Item);
        
    };

});
app.controller("DeleteJediniceMjeraController", function ($scope, $location, ShareData, SifarniciGetByIdFactory,SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/JediniceMjereAPI");
    

    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () {SifarniciDeleteFactory($scope, "/api/JediniceMjereAPI", "/Sifarnici/JediniceMjera"); };

    $scope.back = function () {$location.path("/Sifarnici/JediniceMjera/"); }

});

//Kontroleri za sifarnik proizvoda
app.controller('ProizvodiController', function ($scope, $location, SifarniciGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, '/api/ProizvodiAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Sifarnici/AddProizvodi"); }
    $scope.editItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/EditProizvodi/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/DeleteProizvodi/" + id); }

});
app.controller('AddProizvodiController', function ($scope, $location, SifarniciService,SifarniciGetAllFactory, SifarniciCreateFactory, ShareData) {

    $scope.back = function () { $location.path("/Sifarnici/Proizvodi"); }
    SifarniciGetAllFactory($scope, '/api/JediniceMjereAPI');
    
    SifarniciService.getItem('/api/GrupeProizvodaAPI').then(function (pl) {
        var response = angular.fromJson(JSON.parse(pl.data));
        $scope.collection1 = response
    },
          function (errorPl) {
              $scope.error = 'Greška tokom učitavanja podataka', errorPl;
          });

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = { sifra: $scope.sifra, naziv: $scope.naziv, barcode:$scope.barcode,grupa_proizvoda:$scope.grupa_proizvoda, jedinica_mjere:$scope.jedinica_mjere };
        SifarniciCreateFactory($scope, "/api/ProizvodiAPI", "/Sifarnici/Proizvodi", Item);
    }
});
app.controller("EditProizvodiController", function ($scope, $location, ShareData,SifarniciService, SifarniciGetByIdFactory,SifarniciGetAllFactory, SifarniciUpdateFactory) {

    getProizvodi();
    function getProizvodi() {
        SifarniciGetByIdFactory($scope, "/api/ProizvodiAPI");
        SifarniciGetAllFactory($scope, '/api/JediniceMjereAPI');
        SifarniciService.getItem('/api/GrupeProizvodaAPI').then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data));
            $scope.collection1 = response;
        },
         function (errorPl) {
             $scope.error = 'Greška tokom učitavanja podataka', errorPl;
         });

    }
    $scope.back = function () { $location.path("/Sifarnici/Proizvodi/"); }

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var Item = { id:$scope.Item.id,sifra: $scope.Item.sifra, naziv: $scope.Item.naziv, barcode: $scope.Item.barcode, grupa_proizvoda: $scope.Item.grupa_proizvoda, jedinica_mjere: $scope.Item.jedinica_mjere };
        console.log(Item);
        SifarniciUpdateFactory($scope, "/api/ProizvodiAPI", "/Sifarnici/Proizvodi", Item);

    };

});
app.controller("DeleteProizvodiController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/ProizvodiAPI");


    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/ProizvodiAPI", "/Sifarnici/Proizvodi"); };

    $scope.back = function () { $location.path("/Sifarnici/Proizvodi/"); }

});


//Kontroleri za sifarnik grupa proizvoda
app.controller('GrupeProizvodaController', function ($scope, $location, SifarniciGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, 'api/GrupeProizvodaAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Sifarnici/AddGrupeProizvoda"); }
    $scope.editItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/EditGrupeProizvoda/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/DeleteGrupeProizvoda/" + id); }

});
app.controller('AddGrupeProizvodaController', function ($scope, $location, SifarniciService, SifarniciCreateFactory, SifarniciGetAllFactory, ShareData) {

    $scope.back = function () { $location.path("/Sifarnici/GrupeProizvoda"); }
    SifarniciGetAllFactory($scope, '/api/GrupeProizvodaAPI');

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = { sifra: $scope.sifra, naziv: $scope.naziv,nadgrupa:$scope.nadgrupa };
        SifarniciCreateFactory($scope, "/api/GrupeProizvodaAPI", "/Sifarnici/GrupeProizvoda", Item);
    }
});
app.controller("EditGrupeProizvodaController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciGetAllFactory, SifarniciUpdateFactory) {

    getGrupeProizvoda();
    function getGrupeProizvoda() { SifarniciGetByIdFactory($scope, "/api/GrupeProizvodaAPI"); SifarniciGetAllFactory($scope, '/api/GrupeProizvodaAPI'); }
    $scope.back = function () { $location.path("/Sifarnici/GrupeProizvoda/"); }

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var Item = {
            ID: $scope.Item.id,
            SIFRA: $scope.Item.sifra,
            NAZIV: $scope.Item.naziv,
            NADGRUPA:$scope.Item.nadgrupa
        };
        SifarniciUpdateFactory($scope, "/api/GrupeProizvodaAPI", "/Sifarnici/GrupeProizvoda", Item);

    };

});
app.controller("DeleteGrupeProizvodaController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/GrupeProizvodaAPI");


    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/GrupeProizvodaAPI", "/Sifarnici/GrupeProizvoda"); };

    $scope.back = function () { $location.path("/Sifarnici/GrupeProizvoda/"); }

});

//Kontroleri za sifarnik klase dokumenata
app.controller('KlaseDokumenataController', function ($scope, $location, SifarniciGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, '/api/KlaseDokumenataAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Sifarnici/AddKlaseDokumenata"); }
    $scope.editItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/EditKlaseDokumenata/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/DeleteKlaseDokumenata/" + id); }

});
app.controller('AddKlaseDokumenataController', function ($scope, $location, SifarniciService, SifarniciCreateFactory, ShareData) {

    $scope.back = function () { $location.path("/Sifarnici/KlaseDokumenata"); }
    $scope.id = 0;

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = { sifra: $scope.sifra, naziv: $scope.naziv };
        SifarniciCreateFactory($scope, "/api/KlaseDokumenataAPI", "/Sifarnici/KlaseDokumenata", Item);
    }
});
app.controller("EditKlaseDokumenataController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciUpdateFactory) {

    getKlaseDokumenata();
    function getKlaseDokumenata() { SifarniciGetByIdFactory($scope, "/api/KlaseDokumenataAPI"); }
    $scope.back = function () { $location.path("/Sifarnici/KlaseDokumenata/"); }

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var Item = {
            ID: $scope.Item.id,
            SIFRA: $scope.Item.sifra,
            NAZIV: $scope.Item.naziv
        };
        SifarniciUpdateFactory($scope, "/api/KlaseDokumenataAPI", "/Sifarnici/KlaseDokumenata", Item);

    };

});
app.controller("DeleteKlaseDokumenataController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/KlaseDokumenataAPI");


    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/KlaseDokumenataAPI", "/Sifarnici/KlaseDokumenata"); };

    $scope.back = function () { $location.path("/Sifarnici/KlaseDokumenata/"); }

});


//Kontroleri za sifarnik vrste subjekata
app.controller('VrsteSubjekataController', function ($scope, $location, SifarniciGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, '/api/VrsteSubjekataAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Sifarnici/AddVrsteSubjekata"); }
    $scope.editItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/EditVrsteSubjekata/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/DeleteVrsteSubjekata/" + id); }

});
app.controller('AddVrsteSubjekataController', function ($scope, $location, SifarniciService, SifarniciCreateFactory, ShareData) {

    $scope.back = function () { $location.path("/Sifarnici/VrsteSubjekata"); }
    $scope.id = 0;

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = { sifra: $scope.sifra, naziv: $scope.naziv };
        SifarniciCreateFactory($scope, "/api/VrsteSubjekataAPI", "/Sifarnici/VrsteSubjekata", Item);
    }
});
app.controller("EditVrsteSubjekataController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciUpdateFactory) {

    getVrsteSubjekata();
    function getVrsteSubjekata() { SifarniciGetByIdFactory($scope, "/api/VrsteSubjekataAPI"); }
    $scope.back = function () { $location.path("/Sifarnici/VrsteSubjekata/"); }

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var Item = {
            ID: $scope.Item.id,
            SIFRA: $scope.Item.sifra,
            NAZIV: $scope.Item.naziv
        };
        SifarniciUpdateFactory($scope, "/api/VrsteSubjekataAPI", "/Sifarnici/VrsteSubjekata", Item);

    };

});
app.controller("DeleteVrsteSubjekataController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/VrsteSubjekataAPI");


    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/VrsteSubjekataAPI", "/Sifarnici/VrsteSubjekata"); };

    $scope.back = function () { $location.path("/Sifarnici/VrsteSubjekata/"); }

});

//Kontroleri za sifarnik vrste odnosa subjekata
app.controller('VrsteOdnosaSubjekataController', function ($scope, $location, SifarniciGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, '/api/VrsteOdnosaSubjekataAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Sifarnici/AddVrsteOdnosaSubjekata"); }
    $scope.editItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/EditVrsteOdnosaSubjekata/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/DeleteVrsteOdnosaSubjekata/" + id); }

});
app.controller('AddVrsteOdnosaSubjekataController', function ($scope, $location, SifarniciService, SifarniciCreateFactory, ShareData) {

    $scope.back = function () { $location.path("/Sifarnici/VrsteOdnosaSubjekata"); }
    $scope.id = 0;

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = { sifra: $scope.sifra, naziv: $scope.naziv };
        SifarniciCreateFactory($scope, "/api/VrsteOdnosaSubjekataAPI", "/Sifarnici/VrsteOdnosaSubjekata", Item);
    }
});
app.controller("EditVrsteOdnosaSubjekataController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciUpdateFactory) {

    getVrsteOdnosaSubjekata();
    function getVrsteOdnosaSubjekata() { SifarniciGetByIdFactory($scope, "/api/VrsteOdnosaSubjekataAPI"); }
    $scope.back = function () { $location.path("/Sifarnici/VrsteOdnosaSubjekata/"); }

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var Item = {
            ID: $scope.Item.id,
            SIFRA: $scope.Item.sifra,
            NAZIV: $scope.Item.naziv
        };
        SifarniciUpdateFactory($scope, "/api/VrsteOdnosaSubjekataAPI", "/Sifarnici/VrsteOdnosaSubjekata", Item);

    };

});
app.controller("DeleteVrsteOdnosaSubjekataController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/VrsteOdnosaSubjekataAPI");


    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/VrsteOdnosaSubjekataAPI", "/Sifarnici/VrsteOdnosaSubjekata"); };

    $scope.back = function () { $location.path("/Sifarnici/VrsteOdnosaSubjekata/"); }

});

//Kontroleri za sifarnik vrste dokumenata
app.controller('VrsteDokumenataController', function ($scope, $location, SifarniciGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, '/api/VrsteDokumenataAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Sifarnici/AddVrsteDokumenata"); }
    $scope.editItem = function (id) { ShareData.value = id;  $location.path("/Sifarnici/EditVrsteDokumenata/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/DeleteVrsteDokumenata/" + id); }

});
app.controller('AddVrsteDokumenataController', function ($scope, $location, SifarniciService, SifarniciCreateFactory, SifarniciGetAllFactory, ShareData) {

    $scope.back = function () { $location.path("/Sifarnici/VrsteDokumenata"); }
    $scope.id = 0;
    SifarniciGetAllFactory($scope, '/api/KlaseDokumenataAPI');
    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        
        var Item = { sifra: $scope.sifra, naziv: $scope.naziv, klasa:$scope.klasa };
        SifarniciCreateFactory($scope, "/api/VrsteDokumenataAPI", "/Sifarnici/VrsteDokumenata", Item);
    }
});
app.controller("EditVrsteDokumenataController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciUpdateFactory,SifarniciGetAllFactory,$log) {

    SifarniciGetAllFactory($scope, '/api/KlaseDokumenataAPI');
    getVrsteDokumenata();
    function getVrsteDokumenata() { SifarniciGetByIdFactory($scope, "/api/VrsteDokumenataAPI"); }
    $scope.back = function () { $location.path("/Sifarnici/VrsteDokumenata/"); }

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var Item = {
            ID: $scope.Item.id,
            SIFRA: $scope.Item.sifra,
            NAZIV: $scope.Item.naziv,
            KLASA:$scope.Item.klasa
        };
        $log.debug(Item);
        SifarniciUpdateFactory($scope, "/api/VrsteDokumenataAPI", "/Sifarnici/VrsteDokumenata", Item);

    };

});
app.controller("DeleteVrsteDokumenataController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory,$log) {

    $log.debug("Dobavljam element");
    SifarniciGetByIdFactory($scope, "/api/VrsteDokumenataAPI");
    $log.debug("Dobavio element");

    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/VrsteDokumenataAPI", "/Sifarnici/VrsteDokumenata"); };

    $scope.back = function () { $location.path("/Sifarnici/VrsteDokumenata/"); }

});

//Kontroleri za sifarnik kadrovi
app.controller('KadroviController', function ($scope, $location, SifarniciGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, '/api/KadroviAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Sifarnici/AddKadrovi"); }
    $scope.editItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/EditKadrovi/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/DeleteKadrovi/" + id); }

});
app.controller('AddKadroviController', function ($scope, $location, SifarniciService,SifarniciGetAllFactory, SifarniciCreateFactory, ShareData) {
    SifarniciGetAllFactory($scope, '/api/KlaseKadrovaAPI');
   
    $scope.back = function () { $location.path("/Sifarnici/Kadrovi"); }
    $scope.jmbgPattern = (function () {
        var regexp = /^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])([09][0-9]{2})([0-8][0-9]|9[0-6])([0-9]{3})(\d)$/;
        return {
            test: function (value) {
                return regexp.test(value);
            }
        };
    })();
    $scope.emailPattern = (function () {
        var regexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return {
            test: function (value) {
                return regexp.test(value);
            }
        };
    })();
    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = {
            jmbg: $scope.jmbg, ime: $scope.ime, prezime: $scope.prezime,datum_rodjenja:null, opcina_rodjenja: null,
            drzava_rodjenja:null, email: $scope.email, klasa: $scope.klasa
        };
        console.log(Item);
        SifarniciCreateFactory($scope, "/api/KadroviAPI", "/Sifarnici/Kadrovi", Item);
    }
});
app.controller("EditKadroviController", function ($scope, $location, ShareData, SifarniciGetByIdFactory,SifarniciGetAllFactory, SifarniciUpdateFactory) {

    getKadrovi();
    function getKadrovi() {
        SifarniciGetByIdFactory($scope, "/api/KadroviAPI"); SifarniciGetAllFactory($scope, '/api/KlaseKadrovaAPI');
    }
    $scope.back = function () { $location.path("/Sifarnici/Kadrovi/"); }
    $scope.jmbgPattern = (function () {
        var regexp = /^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])([09][0-9]{2})([0-8][0-9]|9[0-6])([0-9]{3})(\d)$/;
        return {
            test: function (value) {
                return regexp.test(value);
            }
        };
    })();
    $scope.emailPattern = (function () {
        var regexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return {
            test: function (value) {
                return regexp.test(value);
            }
        };
    })();
    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = {
            id:$scope.Item.id, jmbg: $scope.Item.jmbg, ime: $scope.Item.ime, prezime: $scope.Item.prezime,datum_rodjenja:null, opcina_rodjenja: null,
            drzava_rodjenja:null, email: $scope.Item.email, klasa: $scope.Item.klasa
        };
        console.log(Item);
     
        SifarniciUpdateFactory($scope, "/api/KadroviAPI", "/Sifarnici/Kadrovi", Item);

    };

});
app.controller("DeleteKadroviController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/KadroviAPI");


    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/KadroviAPI", "/Sifarnici/Kadrovi"); };

    $scope.back = function () { $location.path("/Sifarnici/Kadrovi/"); }

});

//Controlleri za sifarnik klase kadrova
app.controller('KlaseKadrovaController', function ($scope, $location, SifarniciGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, '/api/KlaseKadrovaAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Sifarnici/AddKlaseKadrova"); }
    $scope.editItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/EditKlaseKadrova/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/DeleteKlaseKadrova/" + id); }

});
app.controller('AddKlaseKadrovaController', function ($scope, $location, SifarniciService, SifarniciCreateFactory, ShareData) {

    $scope.back = function () { $location.path("/Sifarnici/KlaseKadrova"); }
    $scope.id = 0;

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = { sifra: $scope.sifra, naziv: $scope.naziv };
        SifarniciCreateFactory($scope, "/api/KlaseKadrovaAPI", "/Sifarnici/KlaseKadrova", Item);
    }
});
app.controller("EditKlaseKadrovaController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciUpdateFactory) {

    getKlaseKadrova();
    function getKlaseKadrova() { SifarniciGetByIdFactory($scope, "/api/KlaseKadrovaAPI"); }
    $scope.back = function () { $location.path("/Sifarnici/KlaseKadrova/"); }

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var Item = {
            ID: $scope.Item.id,
            SIFRA: $scope.Item.sifra,
            NAZIV: $scope.Item.naziv
        };
        SifarniciUpdateFactory($scope, "/api/JediniceMjereAPI", "/Sifarnici/KlaseKadrova", Item);

    };

});
app.controller("DeleteKlaseKadrovaController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/JediniceMjereAPI");


    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/KlaseKadrovaAPI", "/Sifarnici/KlaseKadrova"); };

    $scope.back = function () { $location.path("/Sifarnici/KlaseKadrova/"); }

});

//Kontroleri za sifarnik odnosi subjekata
app.controller('OdnosiSubjekataController', function ($scope, $location, SifarniciGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, '/api/OdnosiSubjekataAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Sifarnici/AddOdnosiSubjekata"); }
    $scope.editItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/EditOdnosiSubjekata/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/DeleteOdnosiSubjekata/" + id); }

});
app.controller('AddOdnosiSubjekataController', function ($scope, $location, SifarniciService, SifarniciGetAllFactory, SifarniciCreateFactory, ShareData) {

    $scope.back = function () { $location.path("/Sifarnici/OdnosiSubjekata"); }
    SifarniciGetAllFactory($scope, '/api/VrsteOdnosaSubjekataAPI');

    SifarniciService.getItem('/api/SubjektiAPI').then(function (pl) { var response = angular.fromJson(JSON.parse(pl.data)); $scope.collection1 = response;},
          function (errorPl) { $scope.error = 'Greška tokom učitavanja podataka', errorPl; });
    SifarniciService.getItem('/api/SubjektiAPI').then(function (pl) { var response = angular.fromJson(JSON.parse(pl.data)); $scope.collection2 = response; },
          function (errorPl) { $scope.error = 'Greška tokom učitavanja podataka', errorPl; });

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = { vrsta_odnosa: $scope.vrsta_odnosa, subjekt: $scope.subjekat, ka_subjektu: $scope.ka_subjektu };
        console.log(Item);
        SifarniciCreateFactory($scope, "/api/OdnosiSubjekataAPI", "/Sifarnici/OdnosiSubjekata", Item);
    }
});
app.controller("EditOdnosiSubjekataController", function ($scope, $location, ShareData, SifarniciService, SifarniciGetByIdFactory, SifarniciGetAllFactory, SifarniciUpdateFactory) {

    getOdnosiSubjekata();
    function getOdnosiSubjekata() {
        SifarniciGetByIdFactory($scope, "/api/OdnosiSubjekataAPI");
        SifarniciGetAllFactory($scope, '/api/VrsteOdnosaSubjekataAPI');

        SifarniciService.getItem('/api/SubjektiAPI').then(function (pl) { var response = angular.fromJson(JSON.parse(pl.data)); $scope.collection1 = response; },
              function (errorPl) { $scope.error = 'Greška tokom učitavanja podataka', errorPl; });
        SifarniciService.getItem('/api/SubjektiAPI').then(function (pl) { var response = angular.fromJson(JSON.parse(pl.data)); $scope.collection2 = response; },
              function (errorPl) { $scope.error = 'Greška tokom učitavanja podataka', errorPl; });

    }
    $scope.back = function () { $location.path("/Sifarnici/OdnosiSubjekata/"); }

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var Item = { id: $scope.Item.id, vrsta_odnosa: $scope.Item.vrsta_odnosa, subjekt: $scope.Item.subjekat, ka_subjektu: $scope.Item.ka_subjektu };
        console.log(Item);
        SifarniciUpdateFactory($scope, "/api/OdnosiSubjekataAPI", "/Sifarnici/OdnosiSubjekata", Item);

    };

});
app.controller("DeleteOdnosiSubjekataController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/OdnosiSubjekataAPI");


    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/OdnosiSubjekataAPI", "/Sifarnici/OdnosiSubjekata"); };

    $scope.back = function () { $location.path("/Sifarnici/OdnosiSubjekata/"); }

});


//Kontroleri za sifarnik subjekti
app.controller('SubjektiController', function ($scope, $location, SifarniciGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, '/api/SubjektiAPI'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Sifarnici/AddSubjekti"); }
    $scope.editItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/EditSubjekti/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Sifarnici/DeleteSubjekti/" + id); }

});
app.controller('AddSubjektiController', function ($scope, $location, SifarniciService, SifarniciGetAllFactory, SifarniciCreateFactory, ShareData) {

    $scope.emailPattern = (function () {
        var regexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return {
            test: function (value) {
                return regexp.test(value);
            }
        };
    })();
    $scope.back = function () { $location.path("/Sifarnici/Subjekti"); }
    SifarniciGetAllFactory($scope, '/api/VrsteSubjekataAPI');

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = {
            sifra: $scope.sifra, naziv: $scope.naziv, pdv_broj: $scope.pdv_broj, poreski_broj: $scope.poreski_broj, kontakt_osoba: $scope.kontakt_osoba,
            email: $scope.email,telefon:$scope.telefon, fax:$scope.fax, vrsta_subjekta: $scope.vrsta_subjekta};
        console.log(Item);
        SifarniciCreateFactory($scope, "/api/SubjektiAPI", "/Sifarnici/Subjekti", Item);
    }
});
app.controller("EditSubjektiController", function ($scope, $location, ShareData, SifarniciService, SifarniciGetByIdFactory, SifarniciGetAllFactory, SifarniciUpdateFactory) {

    $scope.emailPattern = (function () {
        var regexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return {
            test: function (value) {
                return regexp.test(value);
            }
        };
    })();
    getSubjekti();
    function getSubjekti() {
        SifarniciGetByIdFactory($scope, "/api/SubjektiAPI");
        SifarniciGetAllFactory($scope, '/api/VrsteSubjekataAPI');

        
    }
    $scope.back = function () { $location.path("/Sifarnici/Subjekti/"); }

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var Item = {
            id: $scope.Item.id, sifra: $scope.Item.sifra, naziv: $scope.Item.naziv, pdv_broj: $scope.Item.pdv_broj, poreski_broj: $scope.Item.poreski_broj,
            adresa:$scope.Item.adresa,kontakt_osoba: $scope.Item.kontakt_osoba,
            email: $scope.Item.email, telefon: $scope.Item.telefon, fax: $scope.Item.fax, vrsta_subjekta: $scope.vrsta_subjekta
        };
        console.log(Item);
        SifarniciUpdateFactory($scope, "/api/SubjektiAPI", "/Sifarnici/Subjekti", Item);

    };

});
app.controller("DeleteSubjektiController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/SubjektiAPI");


    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/SubjektiAPI", "/Sifarnici/Subjekti"); };

    $scope.back = function () { $location.path("/Sifarnici/Subjekti/"); }

});

// Role
app.controller('RoleController', function ($scope, $location, SifarniciGetAllFactory, ShareData) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, '/api/RoleAPI/Index'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Roles/AddRole"); }
    $scope.editItem = function (id) { ShareData.value = id; $location.path("/Roles/EditRole/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Roles/DeleteRole/" + id); }

});
app.controller('AddRoleController', function ($scope, $location, SifarniciService, SifarniciCreateFactory, ShareData) {

    $scope.back = function () { $location.path("/Roles"); }
    $scope.id = 0;

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = { roleName: $scope.roleName };
        SifarniciCreateFactory($scope, "/api/RoleAPI/Save", "/Roles", Item);
    }
});
app.controller('AddRoleToUserController', function ($scope, $location, $http, SifarniciService, ShareData) {

    
    $scope.back = function () { $location.path("/Users"); }
    $scope.id = 0;
    $scope.userId = ShareData.value;

    $scope.getRolesForUser = function (userId) {
        var roleList = [];
        $http.get('http://localhost:26264/api/RoleAPI/Index').then(function (pla) {
            var roles = JSON.parse(pla.data);
            $http.get('http://localhost:26264/api/RoleAPI/GetRolesForUser/' + userId).then(function (pl) {
                var json = JSON.parse(pl.data);
                for (var i = 0; i < roles.length; i++) {
                    var roleName = roles[i].RoleName;
                    var found = false;
                    for (var j = 0; j < json.length; j++) {
                        if (json[j].RoleName === roleName) {
                            roleList.push({
                                roleName: json[j].RoleName,
                                status: true
                            });
                            found = true;
                            break;
                        }
                    }
                    if (!found) roleList.push({ roleName: roleName, status: false });
                }
                console.log(roleList);
                $scope.roleList = roleList;
            });
        });
    };
    $scope.getRolesForUser(ShareData.value);
    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = {
            userId: $scope.userId,
            roles: JSON.stringify($scope.roleList)
        };
        $http({ method: "post", url: 'http://localhost:26264/api/RoleAPI/SaveRoles', data: Item }).then(function (pl) {
            var json = JSON.parse(pl.data);
            if (json.ok === true) {
                alert("Uspješno ste izmijenili uloge korisnika!");
                $location.path('/Users');
            }
        });
    }
});
app.controller("EditRoleController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciUpdateFactory) {

    getRole();
    function getRole() { SifarniciGetByIdFactory($scope, "/api/RoleAPI/Show"); }
    $scope.back = function () { $location.path("/Roles"); }

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var id = $scope.Item.ID;
        var roleName = $scope.Item.RoleName;
        var Item = {
            id: id,
            roleName: roleName
        };
        SifarniciUpdateFactory($scope, "/api/RoleAPI/Edit", "/Roles", Item);
     
    };

});
app.controller("DeleteRoleController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/RoleAPI/Show");


    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/RoleAPI/Delete", "/Roles"); };

    $scope.back = function () { $location.path("/Roles"); }

});

// Users
app.controller('UserController', function ($scope, $location, SifarniciGetAllFactory, ShareData,SifarniciService) {
    loadData();

    //Funkcija koja poziva factory, koji zatim putem servisa iz webapi dobavlja podatke.   
    function loadData() { SifarniciGetAllFactory($scope, '/api/UserAPI/Index'); }
    //Funkcije koje omogucavaju rutiranje tokom aktivacije ng-click
    $scope.addItem = function () { $location.path("/Users/AddUser"); }
    $scope.editItem = function (id) { ShareData.value = id; $location.path("/Users/EditUser/" + id); }
    $scope.deleteItem = function (id) { ShareData.value = id; $location.path("/Users/DeleteUser/" + id); }
    $scope.addRoles = function (id, roles) { ShareData.value = id; $location.path("/Roles/ManageRolesForUser/" + id); }
    $scope.banUser = function (Item) {
        
        var promiseBanUser = SifarniciService.putItem("/api/UserAPI/BanUser", Item.ID, Item);
        promiseBanUser.then(function (pl) {
            var response = angular.fromJson(JSON.parse(pl.data))[0];
            alert("Uspjeh pri akciji!");
        },
              function (errorPl) {
                  alert("Neuspjeh pri akciji");
              });

    }
});
app.controller('AddUserController', function ($scope, $location, SifarniciService, SifarniciCreateFactory, ShareData) {

    $scope.back = function () { $location.path("/Users"); }
    $scope.id = 0;

    //Scope.save metoda poziva sifarnicicreatefactory, te mu prosljedjuje apiPath te urlPath, za poziv ka webapi te za naknadno vracanje pri izvrsenju akcija
    $scope.save = function () {
        var Item = {
            userName: $scope.userName,
            email: $scope.email,
            password: $scope.password
        };
        SifarniciCreateFactory($scope, "/api/UserAPI/Save", "/Users", Item);
    }
});
app.controller("EditUserController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciUpdateFactory) {

    getRole();
    function getRole() { SifarniciGetByIdFactory($scope, "/api/UserAPI/Show"); }
    $scope.back = function () { $location.path("/Users"); }

    //The Save method used to make HTTP PUT call to the WEB API to update the record

    $scope.save = function () {
        var id = $scope.Item.ID;
        var userName = $scope.Item.UserName;
        var email = $scope.Item.Email;
        var password = ($scope.Item.Password == null) ? "" : $scope.Item.Password;
        var currPassword = ($scope.Item.CurrentPassword);
    
        var Item = {
            id: id,
            userName: userName,
            email: email,
            password: password,
            currentPassword: currPassword
        };
        SifarniciUpdateFactory($scope, "/api/UserAPI/Edit", "/Users", Item);

    };

});
app.controller("DeleteUserController", function ($scope, $location, ShareData, SifarniciGetByIdFactory, SifarniciDeleteFactory) {

    SifarniciGetByIdFactory($scope, "/api/UserAPI/Show");


    //Delete funkcija poziva factory koji putem servisa vrsi delete poziv u webapi
    $scope.delete = function () { SifarniciDeleteFactory($scope, "/api/UserAPI/Delete", "/Users"); };

    $scope.back = function () { $location.path("/Users"); }

});