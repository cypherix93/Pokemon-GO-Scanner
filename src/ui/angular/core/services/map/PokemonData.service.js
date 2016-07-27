AngularApp.service("PokemonDataService", function PokemonDataService($q, ApiService)
{
    var self = this;
    
    var pokemonDataDeferrred = $q.defer();
    
    var pokemonDataPromise = pokemonDataDeferrred.promise;
    
    var getAllPokemons = function ()
    {
        ApiService.post("/pokemon/getAllPokemons")
            .success(function (response)
            {
                pokemonDataDeferrred.resolve(response.data);
            });
    };
    getAllPokemons();
    
    self.getPokemon = function (pokedexId)
    {
        var def = $q.defer();
        
        pokemonDataPromise
            .then(function (pokemons)
            {
                var pokemon = pokemons.filter(p => (p.pokedexId) === pokedexId)[0];
                                
                def.resolve(pokemon || null);
            });
        
        return def.promise;
    }
});