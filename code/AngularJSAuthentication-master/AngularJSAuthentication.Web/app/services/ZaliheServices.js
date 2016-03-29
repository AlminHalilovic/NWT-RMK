app.service("ZaliheService", function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var ordersServiceFactory = {};
    //Servisi za CRUD operacije, kao parametre primaju path od webapi servisa te po potrebi dodatne parametre(id, Item)
    this.getItem = function (path, proizvod, organizacija) {
        return $http.get(serviceBase + path +
                         "?proizvodId=" + proizvod +
                         "&organizacija=" + organizacija);
    };
});