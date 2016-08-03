AngularApp.controller("MapController", function MapController($scope, $rootScope, $location, MapObjectService)
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
    
    // Marker popup events
    var popupTemplate = "<marker-popup-component marker='markerPopupModel'></marker-popup-component>";
    
    $scope.$on("leafletDirectiveMarker.pokemap.mouseover", function (event, args)
    {
        // The popup is compiled with root scope apparently
        $rootScope.markerPopupModel = args.model;
        
        args.leafletObject
            .bindPopup(popupTemplate, {autopan: false})
            .openPopup();
    });
    $scope.$on("leafletDirectiveMarker.pokemap.mouseout", function (event, args)
    {
        args.leafletObject.closePopup().unbindPopup();
    });
    
    // Debounced Heartbeat retrieval that will be called on specific Google Map Events
    var debouncedHeartbeat = _.debounce(function (latitude, longitude)
    {
        MapObjectService.getPokemonMarkers(latitude, longitude)
            .then(function (data)
            {
                if (self.options.center.lat === data.center.lat && self.options.center.lng === data.center.lng)
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
            
            self.options.center.lat = newVal.latitude;
            self.options.center.lng = newVal.longitude;
        });
    
});