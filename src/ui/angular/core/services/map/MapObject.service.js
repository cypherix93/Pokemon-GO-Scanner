AngularApp.service("MapObjectService", function MapObjectService($q, ApiService, PokemonDataService, IconHelperService)
{
    var self = this;
    
    self.getPokemonMarkers = function (latitude, longitude)
    {
        var def = $q.defer();
        
        ApiService.post("/map/getMapObjects", {latitude: latitude,longitude: longitude})
            .success(function (response)
            {
                var center = response.data.center;
                
                var markers = response.data.markers
                    .map(function (marker)
                    {
                        return composeMarker(marker);
                    });
                
                $q.all(markers)
                    .then(function (markers)
                    {
                        def.resolve({
                            center: center,
                            markers: markers
                        });
                    });
            });
        
        return def.promise;
    };
    
    function composeMarker(marker)
    {
        var def = $q.defer();
        
        if(marker.type === "pokemon")
        {
            def.resolve(composeMarkerWithPokemon(marker));
        }
        else if(marker.type === "pokestop")
        {
            def.resolve(composeMarkerWithPokestop(marker));
        }
        
        return def.promise;
    }
    
    function composeMarkerWithPokemon(marker)
    {
        var def = $q.defer();
        
        PokemonDataService.getPokemon(marker.pokedexId)
            .then(function (pokemon)
            {
                marker.pokemon = pokemon;
                
                marker.options = {
                    icon: marker.pokemon.smallIcon
                };
                
                delete marker.pokedexId;
                
                def.resolve(marker);
            });
        
        return def.promise;
    }
    
    function composeMarkerWithPokestop(marker)
    {
        var def = $q.defer();
                        
        marker.options = {
            icon: IconHelperService.getPokestopIconPath()
        };
        
        def.resolve(marker);
        
        return def.promise;
    }
});