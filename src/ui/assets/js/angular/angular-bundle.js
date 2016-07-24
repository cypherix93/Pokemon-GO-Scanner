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
    
    AngularApp.run(["$http", function($http)
    {
        $http.get("http://localhost:32598/config/getGoogleMapsApiKey")
            .success(function(response)
            {
                googleMapProvider.configure({
                    key: response.data
                });
            })
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
                    return $http[method](baseUrl + apiUrl, data, config);
                }
            })(arg);
        }
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
    
    self.getPokemonIconPath = function(pokedexId)
    {
        return "assets/images/pokemon/go-sprites/small/" + pokedexId + ".png";
    };
});
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
AngularApp.component("homeComponent", {
    controller: "HomeController as Home",
    templateUrl: "templates/app/home/Home.template.html"
});
AngularApp.controller("HomeController", ["$scope", "uiGmapGoogleMapApi", "ApiService", "IconHelperService", function HomeController($scope, uiGmapGoogleMapApi, ApiService, IconHelperService)
{
    var self = this;
    
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
    
    self.map = {};
    self.current = {};
    
    self.pokemonMarkers = [];
    
    var debouncedHeartbeat = _.debounce(function (latitude, longitude)
    {
        ApiService.post("/pokemon/getMapPokemons", { latitude: latitude, longitude: longitude })
            .success(function (response)
            {
                response.data
                    .map(function (marker)
                    {
                        marker.options = {
                            icon: IconHelperService.getPokemonIconPath(marker.pokemon.pokedexId)
                        }
                    });
                
                self.pokemonMarkers = response.data;
            });
        
    }, 500);
    
    var mapInstanceWatch = $scope.$watch(function()
    {
        return self.map.getGMap();
    },
    function(newVal)
    {
        if(!newVal)
            return;

        self.map.getGMap().addListener("idle", function(mapInstance)
        {
            var center = mapInstance.getCenter();
            var coords = {
                latitude: center.lat(),
                longitude: center.lng()
            };
    
            if (coords.latitude && coords.longitude)
            {
                self.current.coords = coords;
                debouncedHeartbeat(coords.latitude, coords.longitude);
            }
        });

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
angular.module("AngularApp").run(["$templateCache", function($templateCache) {$templateCache.put('templates/app/home/Home.template.html','<info-panel>\r\n    <div class="row">\r\n        <div class="col-xs-6">\r\n            <small class="text-muted">Latitude</small>\r\n            <div>{{Home.current.coords.latitude | number:6}}</div>\r\n        </div>\r\n        <div class="col-xs-6">\r\n            <small class="text-muted">Longitude</small>\r\n            <div>{{Home.current.coords.longitude | number:6}}</div>\r\n        </div>\r\n    </div>\r\n</info-panel>\r\n\r\n<ui-gmap-google-map center="Home.mapOptions.center" zoom="Home.mapOptions.zoom" options="Home.mapOptions.options" control="Home.map">\r\n    <ui-gmap-markers models="Home.pokemonMarkers" coords="\'coords\'" idkey="\'id\'" options="\'options\'">\r\n    </ui-gmap-markers>\r\n\r\n    <ui-gmap-marker coords="Home.current.coords" idkey="123">\r\n    </ui-gmap-marker>\r\n</ui-gmap-google-map>');
$templateCache.put('templates/core/directives/info-panel/InfoPanel.template.html','<div class="panel panel-default info-panel" ng-class="{\'shown\': panelShown}">\r\n    <div class="expand-arrow">\r\n        <a class="btn btn-lg btn-default" ng-click="togglePanel()">\r\n            <span class="fa fa-2x" ng-class="{\'fa-angle-double-left\': !panelShown, \'fa-angle-double-right\': panelShown}"></span>\r\n        </a>\r\n    </div>\r\n    <div class="panel-body">\r\n        <div ng-transclude></div>\r\n    </div>\r\n</div>');}]);