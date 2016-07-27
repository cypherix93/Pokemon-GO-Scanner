AngularApp.controller("HomeController", function HomeController($scope, $compile, $location, uiGmapGoogleMapApi, MapObjectService, InfoWindowService)
{
    var self = this;
    
    self.map = {};
    self.current = {};
    
    self.markers = [];
    
    // On load check URL for location coords
    var urlParams = $location.search();
    var urlLat = urlParams.latitude;
    var urlLng = urlParams.longitude;
    
    // Google Maps Options
    self.mapOptions = {
        center: {
            latitude: urlLat || 40.925493,
            longitude: urlLng || -73.123182
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
    
    // Events for each marker
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
                    $location.search(self.current.coords);
                    
                    debouncedHeartbeat(coords.latitude, coords.longitude);
                });
            }
        });
    }
    
    // Debounced Heartbeat retrieval that will be called on specific Google Map Events
    var debouncedHeartbeat = _.debounce(function (latitude, longitude)
    {
        MapObjectService.getPokemonMarkers(latitude, longitude)
            .then(function (data)
            {
                if (_.isEqual(self.current.coords, data.center))
                    self.markers = data.markers;
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
});