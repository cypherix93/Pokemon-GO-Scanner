AngularApp.controller("MapController", function MapController($scope, $location, MapObjectService)
{
    var self = this;
    
    // On load check URL for location coords
    var urlParams = $location.search();
    var urlLat = parseFloat(urlParams.lat);
    var urlLng = parseFloat(urlParams.lng);
    var urlZoom = parseFloat(urlParams.zoom);
    
    self.markers = [];
    
    self.options = {
        center: {
            lat: urlLat || 40.095,
            lng: urlLng || -3.823,
            zoom: urlZoom || 16
        },
        defaults: {
            minZoom: 16,
            maxZoom: 18
        },
        controls: {
            scale: true
        },
        layers: {
            baselayers: {
                googleRoadmap: {
                    name: "Google Streets",
                    layerType: "ROADMAP",
                    type: "google"
                }
            }
        }
    };
    
    // Debounced Heartbeat retrieval that will be called on specific Google Map Events
    var debouncedHeartbeat = _.debounce(function (latitude, longitude)
    {
        MapObjectService.getPokemonMarkers(latitude, longitude)
            .then(function (data)
            {
                // if (_.isEqual(self.options.center, data.center))
                self.markers = data.markers;
            });
        
    }, 500);
    
    // Center Watch for coordinates
    $scope.$watch(function ()
        {
            return self.options.center;
        },
        function (newVal)
        {
            if (!newVal)
                return;
    
            debouncedHeartbeat(newVal.lat, newVal.lng);
            
            $location.search({
                lat: newVal.lat,
                lng: newVal.lng,
                zoom: newVal.zoom
            });
        },
        true);
    
    // Search box Watch for coordinates
    $scope.$watch(function ()
        {
            return self.searchCoords;
        },
        function (newVal)
        {
            if (!newVal)
                return;
            
            self.center.lat = newVal.latitude;
            self.center.lng = newVal.longitude;
        });
    
});