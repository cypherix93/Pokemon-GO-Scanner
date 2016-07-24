AngularApp.controller("HomeController", function HomeController($scope, uiGmapGoogleMapApi, MapPokemonService, LocationHelperService)
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
    
    // Search box Watch for coordinates
    $scope.$watch(function ()
        {
            return self.searchCoords;
        },
        function (newVal)
        {
            if(!newVal)
                return;
        
            self.map.getGMap().setCenter({
                lat: newVal.latitude,
                lng: newVal.longitude
            });
        });
    
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
            
            self.map.getGMap().addListener("idle", function ()
            {
                var center = self.map.getGMap().getCenter();
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
});