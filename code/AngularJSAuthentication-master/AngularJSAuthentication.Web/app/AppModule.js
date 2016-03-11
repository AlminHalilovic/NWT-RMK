
var app = angular.module("AppModule", ['ngRoute', 'LocalStorageModule', 'angular-loading-bar']);



    app.factory("ShareData", function () {
        return { value: 0 }
    });

    //Defining Routing
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when("/home", { controller: "homeController", templateUrl: "/app/views/home.html" });
        $routeProvider.when('/Dokumenti/', { templateUrl: '/app/views/Dokumenti/Index.html', controller: 'DokumentiController' });
        $routeProvider.when('/Izvjestaji/', { templateUrl: '/app/views/Izvjestaji/Index.html', controller: 'IzvjestajiController' });
        $routeProvider.when('/Sifarnici', { templateUrl: '/app/views/Sifarnici/Index.html', controller: 'SifarniciController' });

        $routeProvider.when('/Sifarnici/JediniceMjera', { templateUrl: '/app/views/Sifarnici/JediniceMjera/Index.html', controller: 'JediniceMjeraController' });
        $routeProvider.when('/Sifarnici/AddJediniceMjera', { templateUrl: '/app/views/Sifarnici/JediniceMjera/Add.html', controller: 'AddJediniceMjeraController' });
        $routeProvider.when('/Sifarnici/EditJediniceMjera/:id', { templateUrl: '/app/views/Sifarnici/JediniceMjera/Edit.html', controller: 'EditJediniceMjeraController' });
        $routeProvider.when('/Sifarnici/DeleteJediniceMjera/:id', { templateUrl: '/app/views/Sifarnici/JediniceMjera/Delete.html', controller: 'DeleteJediniceMjeraController' });

        $routeProvider.when('/Sifarnici/Proizvodi', { templateUrl: '/app/views/Sifarnici/Proizvodi/Index.html', controller: 'ProizvodiController' });
        $routeProvider.when('/Sifarnici/AddProizvodi', { templateUrl: '/app/views/Sifarnici/Proizvodi/Add.html', controller: 'AddProizvodiController' });
        $routeProvider.when('/Sifarnici/EditProizvodi/:id', { templateUrl: '/app/views/Sifarnici/Proizvodi/Edit.html', controller: 'EditProizvodiController' });
        $routeProvider.when('/Sifarnici/DeleteProizvodi/:id', { templateUrl: '/app/views/Sifarnici/Proizvodi/Delete.html', controller: 'DeleteProizvodiController' });

        $routeProvider.when('/Sifarnici/GrupeProizvoda', { templateUrl: '/app/views/Sifarnici/GrupeProizvoda/Index.html', controller: 'GrupeProizvodaController' });
        $routeProvider.when('/Sifarnici/AddGrupeProizvoda', { templateUrl: '/app/views/Sifarnici/GrupeProizvoda/Add.html', controller: 'AddGrupeProizvodaController' });
        $routeProvider.when('/Sifarnici/EditGrupeProizvoda/:id', { templateUrl: '/app/views/Sifarnici/GrupeProizvoda/Edit.html', controller: 'EditGrupeProizvodaController' });
        $routeProvider.when('/Sifarnici/DeleteGrupeProizvoda/:id', { templateUrl: '/app/views/Sifarnici/GrupeProizvoda/Delete.html', controller: 'DeleteGrupeProizvodaController' });

        $routeProvider.when('/Sifarnici/KlaseDokumenata', { templateUrl: '/app/views/Sifarnici/KlaseDokumenata/Index.html', controller: 'KlaseDokumenataController' });
        $routeProvider.when('/Sifarnici/AddKlaseDokumenata', { templateUrl: '/app/views/Sifarnici/KlaseDokumenata/Add.html', controller: 'AddKlaseDokumenataController' });
        $routeProvider.when('/Sifarnici/EditKlaseDokumenata/:id', { templateUrl: '/app/views/Sifarnici/KlaseDokumenata/Edit.html', controller: 'EditKlaseDokumenataController' });
        $routeProvider.when('/Sifarnici/DeleteKlaseDokumenata/:id', { templateUrl: '/app/views/Sifarnici/KlaseDokumenata/Delete.html', controller: 'DeleteKlaseDokumenataController' });


        $routeProvider.when('/Sifarnici/VrsteSubjekata', { templateUrl: '/app/views/Sifarnici/VrsteSubjekata/Index.html', controller: 'VrsteSubjekataController' });
        $routeProvider.when('/Sifarnici/AddVrsteSubjekata', { templateUrl: '/app/views/Sifarnici/VrsteSubjekata/Add.html', controller: 'AddVrsteSubjekataController' });
        $routeProvider.when('/Sifarnici/EditVrsteSubjekata/:id', { templateUrl: '/app/views/Sifarnici/VrsteSubjekata/Edit.html', controller: 'EditVrsteSubjekataController' });
        $routeProvider.when('/Sifarnici/DeleteVrsteSubjekata/:id', { templateUrl: '/app/views/Sifarnici/VrsteSubjekata/Delete.html', controller: 'DeleteVrsteSubjekataController' });

        $routeProvider.when('/Sifarnici/VrsteOdnosaSubjekata', { templateUrl: '/app/views/Sifarnici/VrsteOdnosaSubjekata/Index.html', controller: 'VrsteOdnosaSubjekataController' });
        $routeProvider.when('/Sifarnici/AddVrsteOdnosaSubjekata', { templateUrl: '/app/views/Sifarnici/VrsteOdnosaSubjekata/Add.html', controller: 'AddVrsteOdnosaSubjekataController' });
        $routeProvider.when('/Sifarnici/EditVrsteOdnosaSubjekata/:id', { templateUrl: '/app/views/Sifarnici/VrsteOdnosaSubjekata/Edit.html', controller: 'EditVrsteOdnosaSubjekataController' });
        $routeProvider.when('/Sifarnici/DeleteVrsteOdnosaSubjekata/:id', { templateUrl: '/app/views/Sifarnici/VrsteOdnosaSubjekata/Delete.html', controller: 'DeleteVrsteOdnosaSubjekataController' });

        $routeProvider.when('/Sifarnici/VrsteDokumenata', { templateUrl: '/app/views/Sifarnici/VrsteDokumenata/Index.html', controller: 'VrsteDokumenataController' });
        $routeProvider.when('/Sifarnici/AddVrsteDokumenata', { templateUrl: '/app/views/Sifarnici/VrsteDokumenata/Add.html', controller: 'AddVrsteDokumenataController' });
        $routeProvider.when('/Sifarnici/EditVrsteDokumenata/:id', { templateUrl: '/app/views/Sifarnici/VrsteDokumenata/Edit.html', controller: 'EditVrsteDokumenataController' });
        $routeProvider.when('/Sifarnici/DeleteVrsteDokumenata/:id', { templateUrl: '/app/views/Sifarnici/VrsteDokumenata/Delete.html', controller: 'DeleteVrsteDokumenataController' });

        $routeProvider.when('/Sifarnici/Kadrovi', { templateUrl: '/app/views/Sifarnici/Kadrovi/Index.html', controller: 'KadroviController' });
        $routeProvider.when('/Sifarnici/AddKadrovi', { templateUrl: '/app/views/Sifarnici/Kadrovi/Add.html', controller: 'AddKadroviController' });
        $routeProvider.when('/Sifarnici/EditKadrovi/:id', { templateUrl: '/app/views/Sifarnici/Kadrovi/Edit.html', controller: 'EditKadroviController' });
        $routeProvider.when('/Sifarnici/DeleteKadrovi/:id', { templateUrl: '/app/views/Sifarnici/Kadrovi/Delete.html', controller: 'DeleteKadroviController' });

        $routeProvider.when('/Sifarnici/KlaseKadrova', { templateUrl: '/app/views/Sifarnici/KlaseKadrova/Index.html', controller: 'KlaseKadrovaController' });
        $routeProvider.when('/Sifarnici/AddKlaseKadrova', { templateUrl: '/app/views/Sifarnici/KlaseKadrova/Add.html', controller: 'AddKlaseKadrovaController' });
        $routeProvider.when('/Sifarnici/EditKlaseKadrova/:id', { templateUrl: '/app/views/Sifarnici/KlaseKadrova/Edit.html', controller: 'EditKlaseKadrovaController' });
        $routeProvider.when('/Sifarnici/DeleteKlaseKadrova/:id', { templateUrl: '/app/views/Sifarnici/KlaseKadrova/Delete.html', controller: 'DeleteKlaseKadrovaController' });

        $routeProvider.when('/Sifarnici/OdnosiSubjekata', { templateUrl: '/app/views/Sifarnici/OdnosiSubjekata/Index.html', controller: 'OdnosiSubjekataController' });
        $routeProvider.when('/Sifarnici/AddOdnosiSubjekata', { templateUrl: '/app/views/Sifarnici/OdnosiSubjekata/Add.html', controller: 'AddOdnosiSubjekataController' });
        $routeProvider.when('/Sifarnici/EditOdnosiSubjekata/:id', { templateUrl: '/app/views/Sifarnici/OdnosiSubjekata/Edit.html', controller: 'EditOdnosiSubjekataController' });
        $routeProvider.when('/Sifarnici/DeleteOdnosiSubjekata/:id', { templateUrl: '/app/views/Sifarnici/OdnosiSubjekata/Delete.html', controller: 'DeleteOdnosiSubjekataController' });

        $routeProvider.when('/Sifarnici/Subjekti', { templateUrl: '/app/views/Sifarnici/Subjekti/Index.html', controller: 'SubjektiController' });
        $routeProvider.when('/Sifarnici/AddSubjekti', { templateUrl: '/app/views/Sifarnici/Subjekti/Add.html', controller: 'AddSubjektiController' });
        $routeProvider.when('/Sifarnici/EditSubjekti/:id', { templateUrl: '/app/views/Sifarnici/Subjekti/Edit.html', controller: 'EditSubjektiController' });
        $routeProvider.when('/Sifarnici/DeleteSubjekti/:id', { templateUrl: '/app/views/Sifarnici/Subjekti/Delete.html', controller: 'DeleteSubjektiController' });

        $routeProvider.when("/login", {controller: "loginController", templateUrl: "/app/views/login.html" });

        $routeProvider.when("/signup", { controller: "signupController",templateUrl: "/app/views/signup.html"});

        $routeProvider.when("/tokens", { controller: "tokensManagerController",templateUrl: "/app/views/tokens.html"});

        $routeProvider.otherwise({ redirectTo: "/home" });



       
    }]);


   var serviceBase = 'http://localhost:26264/'; //port na kojem je web api

    //var serviceBase = 'http://ngauthenticationapi.azurewebsites.net/';

    app.constant('ngAuthSettings', {
        apiServiceBaseUri: serviceBase,
        clientId: 'ngAuthApp'
    });

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    app.run(['authService', function (authService) {
        authService.fillAuthData();
    }]);
    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
    ]);