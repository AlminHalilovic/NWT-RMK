
var app = angular.module("AppModule", ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'acute.select', 'ngSanitize', 'ui.bootstrap', 'oitozero.ngSweetAlert', 'pascalprecht.translate']);
app.run(function (acuteSelectService) {
    // Set the template path for all instances
    acuteSelectService.updateSetting("templatePath", "/content/templates");
});


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

        $routeProvider.when("/Roles", { controller: "RoleController", templateUrl: "/app/views/Roles/Index.html" });
        $routeProvider.when("/Roles/AddRole", { controller: "AddRoleController", templateUrl: "/app/views/Roles/Add.html" });
        $routeProvider.when("/Roles/EditRole/:id", { controller: "EditRoleController", templateUrl: "/app/views/Roles/Edit.html" });
        $routeProvider.when("/Roles/DeleteRole/:id", { controller: "DeleteRoleController", templateUrl: "/app/views/Roles/Delete.html" });
        $routeProvider.when("/Roles/ManageRolesForUser/:id", { controller: "AddRoleToUserController", templateUrl: "/app/views/Roles/AddRoleToUser.html" });

        $routeProvider.when("/Users", { controller: "UserController", templateUrl: "/app/views/Users/Index.html" });
        $routeProvider.when("/Users/AddUser", { controller: "AddUserController", templateUrl: "/app/views/Users/Add.html" });
        $routeProvider.when("/Users/EditUser/:id", { controller: "EditUserController", templateUrl: "/app/views/Users/Edit.html" });
        $routeProvider.when("/Users/DeleteUser/:id", { controller: "DeleteUserController", templateUrl: "/app/views/Users/Delete.html" });
        //$routeProvider.when("/resetPassword", { controller: "resetPasswordController", templateUrl: "/app/views/resetPassword.html" });

        $routeProvider.otherwise({ redirectTo: "/home" });



       
    }]);

   app.constant('DEBUG_MODE', /*DEBUG_MODE*/true/*DEBUG_MODE*/)
      .constant('VERSION_TAG', /*VERSION_TAG_START*/new Date().getTime()/*VERSION_TAG_END*/)
      .constant('LOCALES', {
          'locales': {
              'ba_BA': 'Bosanski',
              'en_US': 'English'
          },
          'preferredLocale': 'en_US'
      })

    


//Defining Translations
    app.config(function ($translateProvider) {
        $translateProvider.translations('en', {
            homeHEADLINE: 'Welcome to goods and material accounting system!',
            BUTTON_TEXT_EN: 'EN',
            BUTTON_TEXT_BA: 'BA',
            sifarniciIndexHEADLINE: 'Codebooks overview',
            sifarniciIndexProizvodiHEADLINE: 'Product Codebooks',
            sifarniciIndexSubjektiHEADLINE: 'Subjects Codebooks',
            sifarniciIndexKadroviHEADLINE: 'Personnel Codebooks',
            sifarniciIndexDokumentiHEADLINE: 'Documents Codebooks',
            sifarniciIndexProizvodi: 'Products',
            sifarniciIndexGrupeProizvoda: 'Product groups',
            sifarniciIndexJediniceMjera: 'Measure units',
            sifarniciIndexSubjekti: 'Subjects',
            sifarniciIndexVrsteSubjekata: 'Subject types',
            sifarniciIndexVrsteOdnosaSubjekata: 'Subject relation types',
            sifarniciIndexOdnosiSubjekata: 'Subject relations',
            sifarniciIndexKlaseKadrova: 'Personnel classes',
            sifarniciIndexKadrovi: 'Personnel',
            sifarniciIndexKlaseDokumenata: 'Document classes',
            sifarniciIndexVrsteDokumenata: 'Document types',
            sifarniciGrupeProizvodaIndexHEADLINE: "Product group list",
            sifarniciJediniceMjeraIndexHEADLINE: "Measurement unit list",
            sifarniciKadroviIndexHEADLINE: "Personnel list",
            sifarniciKlaseDokumenataIndexHEADLINE: "Document class list",
            sifarniciKlaseKadrovaIndexHEADLINE: "Personnel class list",
            sifarniciOdnosiSubjekataIndexHEADLINE: "Subject relations list",
            sifarniciProizvodiIndexHEADLINE: "Product list",
            sifarniciSubjektiIndexHEADLINE: "Lista subjekata",
            sifarniciVrsteDokumenataIndexHEADLINE: "Document type list",
            sifarniciVrsteOdnosaSubjekataIndexHEADLINE: "Subject relation type list",
            sifarniciVrsteSubjekataIndexHEADLINE: "Subject type list",
            sifarniciAddNew: "Add new",
            sifarniciTableSifra: "CODE",
            sifarniciTableNaziv: "TITLE",
            sifarniciTableJMBG: "JMBG",
            sifarniciTableIme: "FIRST NAME",
            sifarniciTablePrezime: "LAST NAME",
            sifarniciTableEmail: "EMAIL",
            sifarniciTableKlasaKadrova: "PERSONNEL CLASS",
            sifarniciTableVrstaOdnosa: "RELATION TYPE",
            sifarniciTableSubjekat: "SUBJECT",
            sifarniciTableKaSubjektu: "TO SUBJECT",
            sifarniciTableBarcode: "BARCODE",
            sifarniciTableGrupaProizvoda: "PRODUCT GROUP",
            sifarniciTableJediniceMjera: "MEASURE UNITS",
            sifarniciTablePDVBroj: "PDV NUMBER",
            sifarniciTablePoreskiBroj: "TAX NUMBER",
            sifarniciTableAdresa: "ADRESS",
            sifarniciTableKontaktOsoba: "CONTACT PERSON",
            sifarniciTableTelefon: "PHONE",
            sifarniciTableFax: "FAX",
            sifarniciTableVrstaSubjekta: "SUBJECT TYPE",
            sifarniciTableKlasaDokumenata: "DOCUMENT CLASS",
            sifarniciTableNadgrupa: "SUPERGROUP",
            sifarniciOdustani: 'Cancel',
            sifarniciGrupeProizvodaAddHEADLINE: 'Add new group type',
            sifarniciGrupeProizvodaDeleteHEADLINE: 'Delete group type',
            sifarniciGrupeProizvodaEditHEADLINE: 'Izmjena grupe proizvoda',
            sifarniciJediniceMjeraAddHEADLINE: 'Add new measurement unit',
            sifarniciJediniceMjeraDeleteHEADLINE: 'Delete measurement unit',
            sifarniciJediniceMjeraEditHEADLINE: 'Edit measurement unit',
            sifarniciKadroviAddHEADLINE: 'Add new personnel',
            sifarniciKadroviDeleteHEADLINE: 'Delete personnel',
            sifarniciKadroviEditHEADLINE: 'Edit personnel',
            sifarniciKlaseDokumenataAddHEADLINE: 'Add new document class',
            sifarniciKlaseDokumenataDeleteHEADLINE: 'Delete document class',
            sifarniciKlaseDokumenataEditHEADLINE: 'Edit document class',
            sifarniciKlaseKadrovaAddHEADLINE: 'Add new personnel class',
            sifarniciKlaseKadrovaDeleteHEADLINE: 'Delete personnel class',
            sifarniciKlaseKadrovaEditHEADLINE: 'Edit personnel class',
            sifarniciOdnosiSubjekataAddHEADLINE: 'Add new subject relation',
            sifarniciOdnosiSubjekataDeleteHEADLINE: 'Delete subject relation',
            sifarniciOdnosiSubjekataEditHEADLINE: 'Edit subject relation',
            sifarniciProizvodiAddHEADLINE: 'Add new product',
            sifarniciProizvodiDeleteHEADLINE: 'Delete product',
            sifarniciProizvodiEditHEADLINE: 'Edit product',
            sifarniciSubjektiAddHEADLINE: 'Add new subject',
            sifarniciSubjektiDeleteHEADLINE: 'Delete subject',
            sifarniciSubjektiEditHEADLINE: 'Edit subject',
            sifarniciVrsteDokumenataAddHEADLINE: 'Add new document type',
            sifarniciVrsteDokumenataDeleteHEADLINE: 'Delete document type',
            sifarniciVrsteDokumenataEditHEADLINE: 'Edit document type',
            sifarniciVrsteOdnosaSubjekataAddHEADLINE: 'Add new subject relation type',
            sifarniciVrsteOdnosaSubjekataDeleteHEADLINE: 'Delete subject relation type',
            sifarniciVrsteOdnosaSubjekataEditHEADLINE: 'Edit subject relation type',
            sifarniciVrsteSubjekataAddHEADLINE: 'Add new subject type',
            sifarniciVrsteSubjekataDeleteHEADLINE: 'Delete new subject type',
            sifarniciVrsteSubjekataEditHEADLINE: 'Edit new subject type',
            dokumentiInventuraIndexHEADLINE: 'Stocktaking overview',
            dokumentiTableStavke: 'Item',
            dokumentiTableRedniBroj: 'Ordinal number',
            dokumentiTableBrojInventure: 'Stocktaking number',
            dokumentiTableDatumInventure: 'Stocktaking date',
            dokumentiTableOpis: 'Description',
            dokumentiTableSkladiste: 'Warehouse',
            dokumentiTableProizvod: 'Product',
            dokumentiTableZateceno: 'Indebted',
            dokumentiTableCijena: 'Price',
            dokumentiTableVrijednost: 'Value',
            dokumentiInventuraAddHEADLINE: 'New stockhold entry',
            dokumentiTableDokument: 'Document',
            dokumentiTableDatum: 'Date',
            dokumentiTableJedinicaMjere: 'Measurement unit',
            dokumentiTableAkcije: 'Actions',
            dokumentiTableUkupno: 'Total',
            dokumentiInventurniManjakIndexHEADLINE: 'Stockhold shortage overview',
            dokumentiTableBrojInventurnogManjka: 'Stockhold shortage number',
            dokumentiTableDatumInventurnogManjka: 'Stockhold shortage date',
            dokumentiTableKolicina: 'Amount',
            dokumentiInventurniVisakIndexHEADLINE: 'Stockhold excess overview',
            dokumentiTableBrojInventurnogViska: 'Stockhold excess number',
            dokumentiTableDatumInventurnogViska: 'Stockhold excess date',
            dokumentiIzdatnicaIndexHEADLINE: 'Issue slip overview',
            dokumentiTableBrojPrimke: 'Receipt number',
            dokumentiTableDatumPrimke: 'Receipt date',
            dokumentiIzdatnicaAddHEADLINE: 'New issue slip entry',
            dokumentiTableMjestoTroska: 'Cost center',
            dokumentiPocetnoStanjeIndexHEADLINE: 'Initial state overview',
            dokumentiPocetnoStanjeAddHEADLINE: 'New initial state entry',
            dokumentiTableBrojPocetnogStanja: 'Initial state number',
            dokumentiTableDostavnicaPocetnogStanja: 'Inital state invoice',
            dokumentiTableDobavljac: 'Supplier',
            dokumentiPrimkaIndexHEADLINE: 'Receipt overview',
            dokumentiPrimkaAddHEADLINE: 'New receipt entry',
            dokumentiTableBrojPrimke: 'Receipt number',
            dokumentiTableDostavnica: 'Invoice',
            dokumentiDodaj: 'Add new',
            dokumentiStornoIzdatnicaIndexHEADLINE: 'Cancellation issue slip overview',
            dokumentiStornoIzdatnicaAddHEADLINE: 'New Cancellation issue slip entry',
            dokumentiTableBrojStorneIzdatnice: 'Cancellation issue slip number',
            dokumentiTableDatumStorneIzdatnice: 'Cancellation issue slip date',
            dokumentiTablePrimkaZaPovrat: 'Return receipt',
            dokumentiStornoPocetnoStanjeIndexHEADLINE: 'Initial state cancellation overview',
            dokumentiStornoPocetnoStanjeAddHEADLINE: 'New initial state cancellation entry',
            dokumentiTableBrojStornoPocetnogStanja: 'Initial state cancellation number',
            dokumentiTableDatumStornoPocetnogStanja: 'Initial state cancellation date',
            dokumentiSacuvaj: 'Save',
            dokumentiTablePocetnoStanjeZaPovrat: 'Initial state to return',
            dokumentiStornoPrimkaAddHEADLINE: 'New Initial cancellation receipt entry',
            dokumentiStornoPrimkaIndexHEADLINE: 'Cancellation receipt overview',
            dokumentiIndexHEADLINE: 'Document overview',
            dokumentiIndexDokumentiUlaza: 'Entry documents',
            dokumentiIndexPrimke: 'Receipts',
            dokumentiIndexPocetnoStanje: 'Initial state',
            dokumentiIndexIzdatnica: 'Issue slip',
            dokumentiIndexDokumentiIzlaza: 'Output documents',
            dokumentiIndexStornoUlaziDokumenti: 'Cancellation entries documents',
            dokumentiIndexStornoPrimka: 'Cancellation receipts',
            dokumentiIndexStornoIzlaziDokumenti: 'Cancellation outputs documents',
            dokumentiIndexStornoIzdatnice: 'Cancelation issue slips',
            dokumentiIndexInventura: 'Stocktaking',
            dokumentiIndexInventurniViskoviIManjkovi: 'Stocktaking shortage and excess documents',
            dokumentiIndexInventurniManjak: 'Stocktaking shortage',
            dokumentiIndexInventurniVisak: 'Stocktaking excess',
            forgotPasswordHEADLINE: 'Reset password',
            forgotPasswordPotvrdi: 'Submit',
            loginHEADLINE: 'Login',
            loginZaboraviliSteSifru: 'Forgot your password?',
            loginPrijava: 'Login',
            resetPasswordHEADLINE: 'Password reset',
            resetPasswordPotvrdi: 'Submit',
            signupHEADLINE: 'Sign up',
            signupPotvrdi: 'Submit',
            indexDobrodosli: 'Welcome',
            indexSifarnici: 'Codebooks',
            indexIzvjestaji: 'Reports',
            indexDokumenti: 'Documents',
            indexOdjava: 'Log out',
            indexPrijava: 'Log in',
            indexRegistracija: 'Sign up',
            indexPocetna: 'Home'


        }).translations('ba', {
            homeHEADLINE: 'Dobrodošli u sistem robno materijalnog knjigovodstva!',
            INTRO_TEXT: 'Neki tekst!',
            BUTTON_TEXT_EN: 'EN',
            BUTTON_TEXT_BA: 'BA',
            sifarniciIndexHEADLINE: 'Pregled šifarnika',

            sifarniciIndexProizvodiHEADLINE: 'Šifarnici proizvoda',
            sifarniciIndexSubjektiHEADLINE: 'Šifarnici subjekata',
            sifarniciIndexKadroviHEADLINE: 'Šifarnici kadrova',
            sifarniciIndexDokumentiHEADLINE: 'Šifarnici dokumenata',
            sifarniciIndexProizvodi: 'Proizvodi',
            sifarniciIndexGrupeProizvoda: 'Grupe proizvoda',
            sifarniciIndexJediniceMjera: 'Jedinice mjera',
            sifarniciIndexSubjekti: 'Subjekti',
            sifarniciIndexVrsteSubjekata: 'Vrste subjekata',
            sifarniciIndexVrsteOdnosaSubjekata: 'Vrste odnosa subjekata',
            sifarniciIndexOdnosiSubjekata: 'Odnosi subjekata',
            sifarniciIndexKlaseKadrova: 'Klase kadrova',
            sifarniciIndexKadrovi: 'Kadrovi',
            sifarniciIndexKlaseDokumenata: 'Klase dokumenata',
            sifarniciIndexVrsteDokumenata: 'Vrste dokumenata',
            sifarniciGrupeProizvodaIndexHEADLINE: "Lista grupa proizvoda",
            sifarniciJediniceMjeraIndexHEADLINE: "Lista jedinica mjera",
            sifarniciKadroviIndexHEADLINE: "Lista kadrova",
            sifarniciKlaseDokumenataIndexHEADLINE: "Lista klasa dokumenata",
            sifarniciKlaseKadrovaIndexHEADLINE: "Lista klasa kadrova",
            sifarniciOdnosiSubjekataIndexHEADLINE: "Lista odnosa subjekata",
            sifarniciProizvodiIndexHEADLINE: "Lista proizvoda",
            sifarniciSubjektiIndexHEADLINE: "Lista subjekata",
            sifarniciVrsteDokumenataIndexHEADLINE: "Lista vrsta dokumenata",
            sifarniciVrsteOdnosaSubjekataIndexHEADLINE: "Lista vrsta odnosa subjekata",
            sifarniciVrsteSubjekataIndexHEADLINE: "Lista vrsta subjekata",
            sifarniciAddNew: "Dodaj novo",
            sifarniciTableSifra: "ŠIFRA",
            sifarniciTableNaziv: "NAZIV",
            sifarniciTableJMBG: "JMBG",
            sifarniciTableIme: "IME",
            sifarniciTablePrezime: "PREZIME",
            sifarniciTableEmail: "EMAIL",
            sifarniciTableKlasaKadrova: "KLASA KADROVA",
            sifarniciTableVrstaOdnosa: "VRSTA ODNOSA",
            sifarniciTableSubjekat: "SUBJEKAT",
            sifarniciTableKaSubjektu: "KA SUBJEKTU",
            sifarniciTableBarcode: "BARCODE",
            sifarniciTableGrupaProizvoda: "GRUPA PROIZVODA",
            sifarniciTableJediniceMjera: "JEDINICE MJERA",
            sifarniciTablePDVBroj: "PDV BROJ",
            sifarniciTablePoreskiBroj: "PORESKI BROJ",
            sifarniciTableAdresa: "ADRESA",
            sifarniciTableKontaktOsoba: "KONTAKT OSOBA",
            sifarniciTableTelefon: "TELEFON",
            sifarniciTableFax: "FAX",
            sifarniciTableVrstaSubjekta: "VRSTA SUBJEKTA",
            sifarniciTableKlasaDokumenata: "KLASA DOKUMENATA",
            sifarniciTableNadgrupa: "NADGRUPA",
            sifarniciOdustani: 'Odustani',
            sifarniciGrupeProizvodaAddHEADLINE: 'Dodaj novu grupu proizvoda',
            sifarniciGrupeProizvodaDeleteHEADLINE: 'Brisanje grupe proizvoda',
            sifarniciGrupeProizvodaEditHEADLINE: 'Izmjena grupe proizvoda',
            sifarniciJediniceMjeraAddHEADLINE: 'Dodaj novu jedinicu mjere',
            sifarniciJediniceMjeraDeleteHEADLINE: 'Brisanje jedinice mjera',
            sifarniciJediniceMjeraEditHEADLINE: 'Izmjena jedinice mjera',
            sifarniciKadroviAddHEADLINE: 'Dodaj novi kadar',
            sifarniciKadroviDeleteHEADLINE: 'Brisanje kadra',
            sifarniciKadroviEditHEADLINE: 'Izmjena kadra',
            sifarniciKlaseDokumenataAddHEADLINE: 'Dodaj novu klasu dokumenata',
            sifarniciKlaseDokumenataDeleteHEADLINE: 'Brisanje klase dokumenata',
            sifarniciKlaseDokumenataEditHEADLINE: 'Izmjena klase dokumenata',
            sifarniciKlaseKadrovaAddHEADLINE: 'Dodaj novu klasu kadrova',
            sifarniciKlaseKadrovaDeleteHEADLINE: 'Brisanje klase kadrova',
            sifarniciKlaseKadrovaEditHEADLINE: 'Izmjena klase kadrova',
            sifarniciOdnosiSubjekataAddHEADLINE: 'Dodaj novi odnos subjekata',
            sifarniciOdnosiSubjekataDeleteHEADLINE: 'Brisanje odnosa subjekata',
            sifarniciOdnosiSubjekataEditHEADLINE: 'Izmjena odnosa subjekata',
            sifarniciProizvodiAddHEADLINE: 'Dodaj novi proizvod',
            sifarniciProizvodiDeleteHEADLINE: 'Brisanje proizvoda',
            sifarniciProizvodiEditHEADLINE: 'Izmjena proizvoda',
            sifarniciSubjektiAddHEADLINE: 'Dodaj novi subjekat',
            sifarniciSubjektiDeleteHEADLINE: 'Brisanje subjekta',
            sifarniciSubjektiEditHEADLINE: 'Izmjena subjekta',
            sifarniciVrsteDokumenataAddHEADLINE: 'Dodaj novu vrstu dokumenata',
            sifarniciVrsteDokumenataDeleteHEADLINE: 'Brisanje vrste dokumenata',
            sifarniciVrsteDokumenataEditHEADLINE: 'Izmjena vrste dokumenata',
            sifarniciVrsteOdnosaSubjekataAddHEADLINE: 'Dodaj novu vrstu odnosa subjekata',
            sifarniciVrsteOdnosaSubjekataDeleteHEADLINE: 'Brisanje vrste odnosa subjekata',
            sifarniciVrsteOdnosaSubjekataEditHEADLINE: 'Izmjena vrste odnosa subjekata',
            sifarniciVrsteSubjekataAddHEADLINE: 'Dodaj novu vrstu subjekata',
            sifarniciVrsteSubjekataDeleteHEADLINE: 'Brisanje vrste subjekata',
            sifarniciVrsteSubjekataEditHEADLINE: 'Izmjena vrste subjekata',
            dokumentiInventuraIndexHEADLINE: 'Pregled inventura',
            dokumentiTableStavke: 'Stavke',
            dokumentiTableRedniBroj: 'Redni broj',
            dokumentiTableBrojInventure: 'Broj inventure',
            dokumentiTableDatumInventure: 'Datum inventure',
            dokumentiTableOpis: 'Opis',
            dokumentiTableSkladiste: 'Skladiste',
            dokumentiTableProizvod: 'Proizvod',
            dokumentiTableZateceno: 'Zaduzeno',
            dokumentiTableCijena: 'Cijena',
            dokumentiTableVrijednost: 'Vrijednost',
            dokumentiInventuraAddHEADLINE: 'Unos nove inventure',
            dokumentiTableDokument: 'Dokument',
            dokumentiTableDatum: 'Datum',
            dokumentiTableJedinicaMjere: 'Jedinica mjere',
            dokumentiTableAkcije: 'Akcije',
            dokumentiTableUkupno: 'Ukupno',
            dokumentiInventurniManjakIndexHEADLINE: 'Pregled inventurnog manjka',
            dokumentiTableBrojInventurnogManjka: 'Broj inventurnog manjka',
            dokumentiTableDatumInventurnogManjka: 'Datum inventurnog manjka',
            dokumentiTableKolicina: 'Kolicina',
            dokumentiInventurniVisakIndexHEADLINE: 'Pregled inventurnog viška',
            dokumentiTableBrojInventurnogViska: 'Broj inventurnog viška',
            dokumentiTableDatumInventurnogViska: 'Datum inventurnog viška',
            dokumentiIzdatnicaIndexHEADLINE: 'Pregled izdatnica',
            dokumentiTableBrojPrimke: 'Broj primke',
            dokumentiTableDatumPrimke: 'Datum primke',
            dokumentiIzdatnicaAddHEADLINE: 'Unos nove izdatnice',
            dokumentiTableMjestoTroska: 'Mjesto troška',
            dokumentiPocetnoStanjeIndexHEADLINE: 'Pregled početnih stanja',
            dokumentiPocetnoStanjeAddHEADLINE: 'Unos novog početnog stanja',
            dokumentiTableBrojPocetnogStanja: 'Broj početnog stanja',
            dokumentiTableDostavnicaPocetnogStanja: 'Dostavnica početnog stanja',
            dokumentiTableDobavljac: 'Dobavljač',
            dokumentiPrimkaIndexHEADLINE: 'Pregled primki',
            dokumentiPrimkaAddHEADLINE: 'Unos nove primke',
            dokumentiTableBrojPrimke: 'Broj primke',
            dokumentiTableDostavnica: 'Dostavnica',
            dokumentiDodaj: 'Dodaj novo',
            dokumentiStornoIzdatnicaIndexHEADLINE: 'Pregled stornih izdatnica',
            dokumentiStornoIzdatnicaAddHEADLINE: 'Unos storne izdatnice',
            dokumentiTableBrojStorneIzdatnice: 'Broj storne izdatnice',
            dokumentiTableDatumStorneIzdatnice: 'Datum storne izdatnice',
            dokumentiTablePrimkaZaPovrat: 'Primka za povrat',
            dokumentiStornoPocetnoStanjeIndexHEADLINE: 'Pregled storno početnih stanja',
            dokumentiStornoPocetnoStanjeAddHEADLINE: 'Unos storno početnog stanja',
            dokumentiTableBrojStornoPocetnogStanja: 'Broj storno pocetnog stanja',
            dokumentiTableDatumStornoPocetnogStanja: 'Datum storno pocetnog stanja',
            dokumentiSacuvaj: 'Sačuvaj',
            dokumentiTablePocetnoStanjeZaPovrat: 'Početno stanje za povrat',
            dokumentiStornoPrimkaAddHEADLINE: 'Unos storne primke',
            dokumentiStornoPrimkaIndexHEADLINE: 'Pregled stornih primki',
            dokumentiIndexHEADLINE: 'Pregled dokumenata',
            dokumentiIndexDokumentiUlaza: 'Dokumenti ulaza',
            dokumentiIndexPrimke: 'Primke',
            dokumentiIndexPocetnoStanje: 'Početno stanje',
            dokumentiIndexIzdatnica: 'Izdatnica',
            dokumentiIndexDokumentiIzlaza: 'Dokumenti izlaza',
            dokumentiIndexStornoUlaziDokumenti: 'Dokumenti stornih ulaza',
            dokumentiIndexStornoPrimka: 'Storno primke',
            dokumentiIndexStornoIzlaziDokumenti: 'Dokumenti stornih izlaza',
            dokumentiIndexStornoIzdatnice: 'Storne izdatnice',
            dokumentiIndexInventura: 'Inventura',
            dokumentiIndexInventurniViskoviIManjkovi: 'Dokumenti inventurnih viškova i manjkova',
            dokumentiIndexInventurniManjak: 'Inventurni manjak',
            dokumentiIndexInventurniVisak: 'Inventurni visak',
            forgotPasswordHEADLINE:'Povratak šifre',
            forgotPasswordPotvrdi:'Potvrdi',
            loginHEADLINE: 'Prijava',
            loginZaboraviliSteSifru: 'Zaboravili ste šifru?',
            loginPrijava: 'Prijava',
            resetPasswordHEADLINE: 'Poništavanje šifre',
            resetPasswordPotvrdi: 'Potvrdi',
            signupHEADLINE: 'Registracija',
            signupPotvrdi: 'Potvrdi',
            indexDobrodosli:'Dobrodošli',
            indexSifarnici: 'Šifarnici',
            indexIzvjestaji: 'Izvještaji',
            indexDokumenti: 'Dokumenti',
            indexOdjava: 'Odjava',
            indexPrijava: 'Prijava',
            indexRegistracija: 'Registracija',
            indexPocetna: 'Početna'
        });
        $translateProvider.preferredLanguage('ba');
    });
   

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