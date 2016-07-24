AngularApp.service("MapPokemonService", function MapPokemonService($q, ApiService, IconHelperService)
{
    var self = this;
    
    self.getPokemonMarkers = function(latitude, longitude)
    {
        var def = $q.defer();
        
        ApiService.post("/pokemon/getMapPokemons", {latitude: latitude,longitude: longitude})
            .success(function (response)
            {
                response.data
                    .map(function (marker)
                    {
                        marker.options = {
                            icon: IconHelperService.getPokemonIconPath(marker.pokemon.pokedexId)
                        }
                    });
    
                def.resolve(response.data);
            });
        
        return def.promise;
    }
});