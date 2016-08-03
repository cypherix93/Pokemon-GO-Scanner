AngularApp.controller("HomeController", function HomeController($scope, $compile, MapObjectService, InfoWindowService)
{
    var self = this;
    
    self.map = {};
    self.current = {};
    
    self.markers = [];
    
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
});