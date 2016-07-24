AngularApp.controller("HomeController", function HomeController($scope, uiGmapGoogleMapApi, ApiService, IconHelperService)
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
    
    var debouncedHeartbeat = _.debounce(function (latitude, longitude)
    {
        ApiService.post("/pokemon/getMapPokemons", {
            latitude: latitude,
            longitude: longitude
        })
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
                
                if (self.current.coords.latitude && self.current.coords.longitude)
                    debouncedHeartbeat(self.current.coords.latitude, self.current.coords.longitude);
            }
        );
    });
});