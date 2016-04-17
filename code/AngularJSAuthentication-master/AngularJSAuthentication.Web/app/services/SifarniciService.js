app.service("SifarniciService", function ($http, ngAuthSettings) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    
    var ordersServiceFactory = {};
    //Servisi za CRUD operacije, kao parametre primaju path od webapi servisa te po potrebi dodatne parametre(id, Item)
    this.getItem = function (path) { return $http.get(serviceBase + path); };
    this.postItem = function (path, Item) { var request = $http({ method: "post", url: serviceBase+path, data: Item }); return request; };
    this.getItemId = function (path, id) { return $http.get(serviceBase+ path + "/" + id); };
    this.putItem = function (path, id, Item) { var request = $http({ method: "put", url:serviceBase+ path+"/" + id, data: Item }); return request; };
    this.deleteItem = function (path, id) { var request = $http({ method: "delete", url: serviceBase+ path+"/" + id }); return request; };
});
