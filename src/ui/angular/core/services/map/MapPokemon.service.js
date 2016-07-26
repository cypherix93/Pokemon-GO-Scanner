AngularApp.service("MapPokemonService", function MapPokemonService($q, ApiService, PokemonDataService)
{
    var self = this;
    
    var composeMarkerWithPokemon = function(marker)
    {
        var def = $q.defer();
        
        PokemonDataService.getPokemon(marker.pokedexId)
            .then(function(pokemon)
            {
                marker.pokemon = pokemon;
    
                marker.options = {
                    icon: marker.pokemon.smallIcon
                };
                
                delete marker.pokedexId;
                
                def.resolve(marker);
            });
        
        return def.promise;
    };
      
    
    self.getPokemonMarkers = function(latitude, longitude)
    {
        var def = $q.defer();
        
        ApiService.post("/pokemon/getMapPokemons", {latitude: latitude,longitude: longitude})
            .success(function (response)
            {
                response.data
                    .map(function (marker)
                    {
                        return composeMarkerWithPokemon(marker);
                    });
    
                def.resolve($q.all(response.data));
            });
        
        return def.promise;
    }
});