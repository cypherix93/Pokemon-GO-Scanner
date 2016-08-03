AngularApp.controller("MapController", function MapController($scope, $location)
{
    var self = this;
    
    // On load check URL for location coords
    var urlParams = $location.search();
    var urlLat = parseFloat(urlParams.lat);
    var urlLng = parseFloat(urlParams.lng);
    var urlZoom = parseFloat(urlParams.zoom);
    
    console.log(urlParams);
    
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
        }
    };
    
    // Center Watch for coordinates
    $scope.$watch(function ()
        {
            return self.options.center;
        },
        function (newVal)
        {
            if (!newVal)
                return;
            
            console.log(newVal);
            
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