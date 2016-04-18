
var app = angular.module("AppModule", ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'acute.select', 'ngSanitize', 'ui.bootstrap', 'oitozero.ngSweetAlert']);
app.run(function (acuteSelectService) {
    // Set the template path for all instances
    acuteSelectService.updateSetting("templatePath", "/content/templates");
})


    app.factory("ShareData", function () {
        return { value: 0 }
    });

    //Defining Routing
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when("/home", { controller: "homeController", templateUrl: "/app/views/home.html" });
        $routeProvider.when('/Dokumenti/', { templateUrl: '/app/views/Dokumenti/Index.html', controller: 'DokumentiController' });
        $routeProvider.when('/Izvjestaji/', { templateUrl: '/app/views/Izvjestaji/Index.html', controller: 'IzvjestajiController' });
        $routeProvider.when('/Sifarnici', { templateUrl: '/app/views/Sifarnici/Index.html', controller: 'SifarniciController' });

        $routeProvider.when('/Dokumenti/Primka/', { templateUrl: '/app/views/Dokumenti/Primka/Index.html', controller: 'PrimkaController' });
        $routeProvider.when('/Dokumenti/Primka/AddPrimka', { templateUrl: '/app/views/Dokumenti/Primka/Add.html', controller: 'AddPrimkaController' });

        $routeProvider.when('/Dokumenti/PocetnoStanje/', { templateUrl: '/app/views/Dokumenti/PocetnoStanje/Index.html', controller: 'PocetnoStanjeController' });
        $routeProvider.when('/Dokumenti/PocetnoStanje/AddPocetnoStanje', { templateUrl: '/app/views/Dokumenti/PocetnoStanje/Add.html', controller: 'AddPocetnoStanjeController' });

        $routeProvider.when('/Dokumenti/Izdatnica/', { templateUrl: '/app/views/Dokumenti/Izdatnica/Index.html', controller: 'IzdatnicaController' });
        $routeProvider.when('/Dokumenti/Izdatnica/AddIzdatnica', { templateUrl: '/app/views/Dokumenti/Izdatnica/Add.html', controller: 'AddIzdatnicaController' });

        $routeProvider.when('/Dokumenti/Inventura/', { templateUrl: '/app/views/Dokumenti/Inventura/Index.html', controller: 'InventuraController' });
        $routeProvider.when('/Dokumenti/Inventura/AddInventura', { templateUrl: '/app/views/Dokumenti/Inventura/Add.html', controller: 'AddInventuraController' });
      
        $routeProvider.when('/Dokumenti/InventurniManjak/', { templateUrl: '/app/views/Dokumenti/InventurniManjak/Index.html', controller: 'InventurniManjakController' });
        
        $routeProvider.when('/Dokumenti/InventurniVisak/', { templateUrl: '/app/views/Dokumenti/InventurniVisak/Index.html', controller: 'InventurniVisakController' });

        $routeProvider.when('/Dokumenti/StornoPrimka/', { templateUrl: '/app/views/Dokumenti/StornoPrimka/Index.html', controller: 'StornoPrimkaController' });
        $routeProvider.when('/Dokumenti/StornoPrimka/AddStornoPrimka', { templateUrl: '/app/views/Dokumenti/StornoPrimka/Add.html', controller: 'AddStornoPrimkaController' });

        $routeProvider.when('/Dokumenti/StornoIzdatnica/', { templateUrl: '/app/views/Dokumenti/StornoIzdatnica/Index.html', controller: 'StornoIzdatnicaController' });
        $routeProvider.when('/Dokumenti/StornoIzdatnica/AddStornoIzdatnica', { templateUrl: '/app/views/Dokumenti/StornoIzdatnica/Add.html', controller: 'AddStornoIzdatnicaController' });

        $routeProvider.when('/Dokumenti/StornoPocetnoStanje/', { templateUrl: '/app/views/Dokumenti/StornoPocetnoStanje/Index.html', controller: 'StornoPocetnoStanjeController' });
        $routeProvider.when('/Dokumenti/StornoPocetnoStanje/AddStornoPocetnoStanje', { templateUrl: '/app/views/Dokumenti/StornoPocetnoStanje/Add.html', controller: 'AddStornoPocetnoStanjeController' });

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

        $routeProvider.when("/confirmEmail/:userId/:code", { controller: "confirmEmailController", templateUrl: "/app/views/confirmEmail.html" });

        $routeProvider.when("/resetPassword/:userId/:code", { controller: "resetPasswordController", templateUrl: "/app/views/resetPassword.html" });

        $routeProvider.when("/forgotPassword", { controller: "forgotPasswordController", templateUrl: "/app/views/forgotPassword.html" });

        //$routeProvider.when("/resetPassword", { controller: "resetPasswordController", templateUrl: "/app/views/resetPassword.html" });

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