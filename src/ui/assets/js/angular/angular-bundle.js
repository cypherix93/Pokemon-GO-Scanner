// Global Angular App Declaration
var AngularApp = angular.module("AngularApp",
    [
        "ngSanitize",
        "ngAnimate",
        "ngMessages",
        "ui.router",
        "ui.bootstrap",
        "toastr",
        "uiGmapgoogle-maps"
    ]);
// Configure Angular App Preferences
AngularApp.config(["toastrConfig", function (toastrConfig)
{
    toastrConfig.autoDismiss = true;
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.preventOpenDuplicates = true;
}]);

(function()
{
    var googleMapProvider;
    
    AngularApp.config(["uiGmapGoogleMapApiProvider", function (uiGmapGoogleMapApiProvider)
    {
        googleMapProvider = uiGmapGoogleMapApiProvider;
    }]);
    
    AngularApp.run(["ApiService", function(ApiService)
    {
        ApiService.get("/config/getGoogleMapsApiKey")
            .success(function(response)
            {
                googleMapProvider.configure({
                    key: response.data
                });
            });
    }]);
})();
// Configure Angular App Routes
AngularApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider)
{
    $locationProvider.html5Mode(false);
}]);
// Configure Angular App Initialization
AngularApp.run(["$rootScope", "$state", function ($rootScope, $state)
{
    $state.go("home");
}]);
AngularApp.service("ApiService", ["$http", function ApiService($http)
{
    var self = this;
    
    var baseUrl = "http://localhost:32598";
    
    var bindMethods = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];
            
            self[arg] = (function(method)
            {
                return function (apiUrl, config)
                {
                    apiUrl = formatApiUrl(apiUrl);
                    
                    return $http[method](baseUrl + apiUrl, config);
                }
            })(arg);
        }
    };
    
    var bindMethodsWithData = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];
            
            self[arg] = (function(method)
            {
                return function (apiUrl, data, config)
                {
                    apiUrl = formatApiUrl(apiUrl);
                    
                    return $http[method](baseUrl + apiUrl, data, config);
                }
            })(arg);
        }
    };
    
    var formatApiUrl = function(url)
    {
        return url[0] === "/" ? url : "/" + url;
    };
    
    bindMethods("get", "delete", "head", "jsonp");
    bindMethodsWithData("post", "put", "patch");
}]);
AngularApp.service("AuthService", ["$q", "$window", function ($q, $window)
{
    var self = this;

}]);
AngularApp.service("IdentityService", function ()
{
    var self = this;

    // Current User Identity
    self.currentUser = undefined;

    // Function to check if the current user is authenticated
    self.isAuthenticated = function ()
    {
        return !!self.currentUser;
    };
});
AngularApp.service("IconHelperService", function IconHelperService()
{
    var self = this;
    
    self.getPokemonSmallIconPath = function(pokedexId)
    {
        return "assets/images/pokemon/go-sprites/small/" + pokedexId + ".png";
    };
    self.getPokemonBigIconPath = function(pokedexId)
    {
        return "assets/images/pokemon/go-sprites/big/" + pokedexId + ".png";
    };
});
AngularApp.service("LocationHelperService", ["$q", "ApiService", function LocationHelperService($q, ApiService)
{
    var self = this;
    
    self.reverseGeocode = function(locationName)
    {
        var def = $q.defer();
        
        ApiService.post("/location/reverseGeocode", {location:locationName})
            .success(function(response)
            {
                def.resolve(response.data);
            });
        
        return def.promise;
    };
}]);
AngularApp.service("InfoWindowService", ["$q", "$compile", "$templateCache", function InfoWindowService($q, $compile, $templateCache)
{
    var self = this;
    
    var pokemonWindowTemplate = $templateCache.get("templates/core/templates/PokemonInfoWindow.template.html");
    
    self.getPokemonInfoWindowTemplate = function (scope)
    {
        return $compile(pokemonWindowTemplate)(scope);
    };
}]);
AngularApp.service("MapPokemonService", ["$q", "ApiService", "PokemonDataService", function MapPokemonService($q, ApiService, PokemonDataService)
{
    var self = this;
    
    var composeMarkerWithPokemon = function(marker)
    {
        var def = $q.defer();
        
        PokemonDataService.getPokemon(marker.pokedexId)
            .then(function(pokemon)
            {
                marker.pokemon = pokemon;
    
                marker.options = {
                    icon: marker.pokemon.smallIcon
                };
                
                delete marker.pokedexId;
                
                def.resolve(marker);
            });
        
        return def.promise;
    };
      
    
    self.getPokemonMarkers = function(latitude, longitude)
    {
        var def = $q.defer();
        
        ApiService.post("/pokemon/getMapPokemons", {latitude: latitude,longitude: longitude})
            .success(function (response)
            {
                response.data
                    .map(function (marker)
                    {
                        return composeMarkerWithPokemon(marker);
                    });
    
                def.resolve($q.all(response.data));
            });
        
        return def.promise;
    }
}]);
AngularApp.service("PokemonDataService", ["$q", "ApiService", "IconHelperService", function PokemonDataService($q, ApiService, IconHelperService)
{
    var self = this;
    
    var pokemonDataDeferrred = $q.defer();
    
    var pokemonDataPromise = pokemonDataDeferrred.promise;
    
    var getAllPokemons = function ()
    {
        ApiService.post("/pokemon/getAllPokemons")
            .success(function (response)
            {
                pokemonDataDeferrred.resolve(response.data);
            });
    };
    getAllPokemons();
    
    self.getPokemon = function (pokedexId)
    {
        var def = $q.defer();
        
        pokemonDataPromise
            .then(function (pokemons)
            {
                var pokemon = pokemons.filter(p => (p.pokedexId) === pokedexId)[0];
                
                if (!pokemon)
                    def.resolve(null);
                
                pokemon.smallIcon = IconHelperService.getPokemonSmallIconPath(pokedexId);
                pokemon.bigIcon = IconHelperService.getPokemonBigIconPath(pokedexId);
                
                def.resolve(pokemon);
            });
        
        return def.promise;
    }
}]);
AngularApp.service("ModalService", ["$q", "$http", "$compile", "$rootScope", function ($q, $http, $compile, $rootScope)
{
    var exports = this;

    var ModalInstance = function (element, options)
    {
        var _instance = this;

        // Fields
        _instance.element = element;
        _instance.state = "default";

        _instance.onOpen = options.onOpen;
        _instance.onClose = options.onClose;

        // Init the modal
        _instance.element.modal({
            show: false
        });

        // Width fix
        _instance.element.width(options.width);

        // Event Handlers
        _instance.element.on("show", function ()
        {
            // Margin fix
            _instance.element.css("margin-left", -(_instance.element.width() / 2));

            if (_instance.onOpen)
                _instance.onOpen();
        });
        _instance.element.on("hidden", function ()
        {
            if (_instance.onClose)
                _instance.onClose();
        });

        // Open and Close functions
        _instance.open = function ()
        {
            _instance.element.modal("show");
        };
        _instance.close = function ()
        {
            _instance.element.modal("hide");
        };
    };

    // Create modal from Template URL
    exports.createModal = function (templateUrl, options)
    {
        var def = $q.defer();

        // Get the template markup from the URL provided
        $http.get(templateUrl)
            .success(function (response)
            {
                var element = angular.element(response);

                var scope = $rootScope.$new(true);
                $compile(element)(scope);

                angular.element("#content-container").append(element);

                var modalInstance = new ModalInstance(element, options || {width: 600});

                def.resolve(modalInstance);
            });

        return def.promise;
    };

    // Store for all the global modals
    exports.modals = {};

    exports.waitUntilReady = function (modalName)
    {
        var def = $q.defer();

        var watch = $rootScope.$watch(function()
        {
            return !!exports.modals[modalName];
        }, function()
        {
            def.resolve(exports.modals[modalName]);
            watch();
        });

        return def.promise;
    };

    // Global modals init function
    exports.initGlobalModals = function ()
    {
    };
}]);
AngularApp.filter("expiration", function ()
{
    return function (milliseconds)
    {
        var mins = milliseconds / 1000 / 60;
        
        if (mins < 1)
            return "Less than a minute";
        
        var days = milliseconds / 1000 / 60 / 60 / 24;
        
        if (days > 7)
            return "An eternity";
        
        return moment.duration(milliseconds, "ms").format("d[d] h[h] m[m]");
    };
});
AngularApp.directive("infoPanel", function ()
{
    return {
        restrict: "EA",
        scope: {},
        transclude: true,
        templateUrl: "templates/core/directives/info-panel/InfoPanel.template.html",
        link: {
            pre: function (scope, element, attrs)
            {
                scope.panelShown = true;
                
                scope.togglePanel = function()
                {
                    scope.panelShown = !scope.panelShown;
                };
            },
            post: function (scope, element, attrs)
            {
                
            }
        }
    }
});
AngularApp.directive("pokemonType", function ()
{
    return {
        restrict: "A",
        scope: {
            pokemonType: "@"
        },
        templateUrl: "templates/core/directives/pokemon-type/PokemonType.template.html",
        link: function (scope, element, attrs)
        {
            scope.$watch("pokemonType", function (newVal)
            {
                if (!newVal)
                    return;
                
                scope.types = scope.pokemonType
                    .split("/")
                    .map(function (type)
                    {
                        return type.trim();
                    });
            });
        }
    }
});
AngularApp.component("homeComponent", {
    controller: "HomeController as Home",
    templateUrl: "templates/app/home/Home.template.html"
});
AngularApp.controller("HomeController", ["$scope", "$compile", "uiGmapGoogleMapApi", "MapPokemonService", "InfoWindowService", function HomeController($scope, $compile, uiGmapGoogleMapApi, MapPokemonService, InfoWindowService)
{
    var self = this;
    
    self.map = {};
    self.current = {};
    
    self.pokemonMarkers = [];
    
    self.mapOptions = {
        center: {
            latitude: 40.925493,
            longitude: -73.123182
        },
        zoom: 16,
        options: {
            disableDefaultUI: true,
            zoomControl: true,
            minZoom: 16,
            maxZoom: 18
        }
    };
    
    var infowindow;
    var infowindowScope = $scope.$new(true);
    var infowindowTemplate = InfoWindowService.getPokemonInfoWindowTemplate(infowindowScope);
    
    self.pokemonMarkerEvents = {
        "mouseover": function (marker, event, model, args)
        {
            infowindowScope.$apply(function ()
            {
                infowindowScope.marker = model;
            });
            
            infowindow = new google.maps.InfoWindow({
                content: infowindowTemplate.html()
            });
            
            var map = self.map.getGMap();
            
            infowindow.open(map, marker);
        },
        "mouseout": function ()
        {
            infowindow.close();
        }
    };
    
    // Search box Watch for coordinates
    $scope.$watch(function ()
        {
            return self.searchCoords;
        },
        function (newVal)
        {
            if (!newVal)
                return;
            
            self.map.getGMap().setCenter({
                lat: newVal.latitude,
                lng: newVal.longitude
            });
        });
    
    // Map Init Handler
    function mapInitHandler()
    {
        self.map.getGMap().addListener("idle", function ()
        {
            var center = self.map.getGMap().getCenter();
            var coords = {
                latitude: center.lat(),
                longitude: center.lng()
            };
            
            if (coords.latitude && coords.longitude)
            {
                $scope.$apply(function ()
                {
                    self.current.coords = coords;
                    debouncedHeartbeat(coords.latitude, coords.longitude);
                });
            }
        });
    }
    
    // Debounced Heartbeat retrieval that will be called on specific Google Map Events
    var debouncedHeartbeat = _.debounce(function (latitude, longitude)
    {
        MapPokemonService.getPokemonMarkers(latitude, longitude)
            .then(function (markers)
            {
                self.pokemonMarkers = markers;
            })
        
    }, 500);
    
    // One time Watch for Map Init
    var mapInstanceWatch = $scope.$watch(function ()
        {
            return self.map.getGMap;
        },
        function (newVal)
        {
            if (!newVal)
                return;
            
            // Init map
            mapInitHandler();
            
            // Dispose watch
            mapInstanceWatch();
        });
}]);
AngularApp.config(["$stateProvider", function ($stateProvider)
{
    $stateProvider.state("home",
        {
            url: "/",
            templateUrl: "views/home/index.html",
            onEnter: ["$rootScope", function($rootScope)
            {
                $rootScope.PageName = "Home"
            }]
        });
}]);
AngularApp.component("locationSearchComponent", {
    controller: "LocationSearchController as LocationSearch",
    templateUrl: "templates/app/location-search/LocationSearch.template.html",
    bindings: {
        coords: "="
    }
});
AngularApp.controller("LocationSearchController", ["$scope", "LocationHelperService", function LocationSearchController($scope, LocationHelperService)
{
    var self = this;
        
    self.searchLocation = function()
    {
        if(!self.searchInput)
            return;
        
        LocationHelperService.reverseGeocode(self.searchInput)
            .then(function(coords)
            {
                self.coords = coords;
            });
    };
}]);
angular.module("AngularApp").run(["$templateCache", function($templateCache) {$templateCache.put('templates/app/home/Home.template.html','<location-search-component coords="Home.searchCoords"></location-search-component>\r\n\r\n<info-panel>\r\n    <div class="row">\r\n        <div class="col-xs-6">\r\n            <small class="text-muted">Latitude</small>\r\n            <div>{{Home.current.coords.latitude | number:6}}</div>\r\n        </div>\r\n        <div class="col-xs-6">\r\n            <small class="text-muted">Longitude</small>\r\n            <div>{{Home.current.coords.longitude | number:6}}</div>\r\n        </div>\r\n    </div>\r\n</info-panel>\r\n\r\n<ui-gmap-google-map center="Home.mapOptions.center" zoom="Home.mapOptions.zoom" options="Home.mapOptions.options" control="Home.map">\r\n\r\n    <!-- Pokemon Markers -->\r\n    <ui-gmap-markers models="Home.pokemonMarkers" events="Home.pokemonMarkerEvents" coords="\'coords\'" idkey="\'id\'" events="" options="\'options\'"></ui-gmap-markers>\r\n\r\n    <!-- Center Marker -->\r\n    <ui-gmap-marker coords="Home.current.coords" idkey="\'GOOGLE_MAPS_CENTER_MARKER\'"></ui-gmap-marker>\r\n\r\n</ui-gmap-google-map>');
$templateCache.put('templates/app/location-search/LocationSearch.template.html','<div class="navbar navbar-default navbar-fixed-top">\r\n    <div class="container clearfix">\r\n        <div class="pull-left text-center">\r\n            <div class="navbar-brand">\r\n                <img class="navbar-image" src="assets/images/logo-small.png" height="40">\r\n                Pok\xE9Radar\r\n            </div>\r\n        </div>\r\n        <div class="col-xs-9">\r\n            <form class="navbar-form" ng-submit="LocationSearch.searchLocation()" novalidate>\r\n                <div class="input-group search-input-group">\r\n                    <input type="text" class="form-control input-lg" placeholder="Search for location... e.g. Times Square, NY" ng-model="LocationSearch.searchInput">\r\n\r\n                    <div class="input-group-btn">\r\n                        <button type="submit" class="btn-lg btn-default">\r\n                            <span class="fa fa-lg fa-search"></span>\r\n                        </button>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>');
$templateCache.put('templates/core/templates/PokemonInfoWindow.template.html','<div>\r\n    <div class="info-window pokemon-info-window text-center">\r\n        <div>\r\n            <img src="{{marker.pokemon.bigIcon}}" width="90">\r\n        </div>\r\n        <h5 class="info-window-title">\r\n            <small class="text-muted">#{{marker.pokemon.pokedexId}}</small>\r\n            {{marker.pokemon.name}}\r\n        </h5>\r\n        <div>\r\n            <span pokemon-type="{{marker.pokemon.type}}"></span>\r\n        </div>\r\n        <div class="info-window-label">\r\n            {{marker.expirationTime | expiration}} remaining\r\n        </div>\r\n    </div>\r\n</div>');
$templateCache.put('templates/core/directives/info-panel/InfoPanel.template.html','<div class="panel panel-default info-panel" ng-class="{\'shown\': panelShown}">\r\n    <div class="expand-arrow">\r\n        <a class="btn btn-lg btn-default" ng-click="togglePanel()">\r\n            <span class="fa fa-2x" ng-class="{\'fa-angle-double-left\': !panelShown, \'fa-angle-double-right\': panelShown}"></span>\r\n        </a>\r\n    </div>\r\n    <div class="panel-body">\r\n        <div ng-transclude></div>\r\n    </div>\r\n</div>');
$templateCache.put('templates/core/directives/pokemon-type/PokemonType.template.html','<span ng-repeat="type in types track by $index">\r\n    <span class="label pokemon-type pokemon-type-{{type.toLowerCase()}}">\r\n        {{type}}\r\n    </span>\r\n</span>');}]);