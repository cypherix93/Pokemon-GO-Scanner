AngularApp.controller("HomeController", function HomeController($scope, uiGmapGoogleMapApi)
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
            zoomControl: true
        }
    };
    
    self.map = {};
    self.current = {};
    
    self.pokemonMarkers = [];
    
    uiGmapGoogleMapApi.then(function (maps)
    {
        $scope.$watch(function ()
            {
                return self.map.getGMap().getCenter();
            },
            function (newVal, oldVal)
            {
                self.current.coords = {
                    latitude: newVal.lat(),
                    longitude: newVal.lng()
                };
            }
        );
    });
});