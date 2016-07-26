AngularApp.component("locationSearchComponent", {
    controller: "LocationSearchController as LocationSearch",
    templateUrl: "templates/app/location-search/LocationSearch.template.html",
    bindings: {
        coords: "="
    }
});