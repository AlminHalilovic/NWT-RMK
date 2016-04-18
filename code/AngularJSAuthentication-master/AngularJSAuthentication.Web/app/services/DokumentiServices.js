app.service("DokumentiService", function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var ordersServiceFactory = {};
    //Servisi za CRUD operacije, kao parametre primaju path od webapi servisa te po potrebi dodatne parametre(id, Item)
    this.getItem = function (path) { return $http.get(serviceBase + path); };
    this.postItem = function (path, Item) { var request = $http({ method: "post", url: serviceBase + path, data: Item }); return request; };
    this.getItemId = function (path, id) { return $http.get(serviceBase + path + "/" + id); };
    this.putItem = function (path, id, Item) { var request = $http({ method: "put", url: serviceBase + path + "/" + id, data: Item }); return request; };
    this.deleteItem = function (path, id) { var request = $http({ method: "delete", url: serviceBase + path + "/" + id }); return request; };
    this.recalculateOrdinals = function (stavke) {
        for (var i = 0; i < stavke.length; i++) {
            stavke[i].redni_broj = i + 1;
        }
        return true;
    };
    this.calculateTotal = function (stavke) {
        var sum = 0;
        for (var i = 0; i < stavke.length; i++) {
            var cijena = stavke[i].cijena == null ? 0.0 : stavke[i].cijena;
            var kolicina = stavke[i].kolicina == null ? 0 : stavke[i].kolicina;
            sum += cijena * kolicina;
        }
        return sum;
    }
    this.formatDate = function (date) {
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
    }
});
