AngularApp.controller("HomeController", function HomeController(HeartbeatTestService)
{
    const MapPokemon = apprequire("./core/models/map/MapPokemon").MapPokemon;
    
    const self = this;
        
    self.map = {
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
    
    self.pokemonMarkers = [];
    
    var heartbeat = HeartbeatTestService.getMockHeartbeat();
    
    var pokemons = _.flatten(
        heartbeat.cells
        .map(x => x.MapPokemon)
    );
    
    for (let pokemon of pokemons)
    {
        let latitude = pokemon.Latitude;
        let longitude = pokemon.Longitude;
        let pokemonId = pokemon.PokedexTypeId;
        
        let mapPokemon = new MapPokemon(latitude, longitude, pokemonId);
        
        let pokemonMarker = {
            id: mapPokemon.id,
            coords: mapPokemon.coords,
            options: {
                icon: mapPokemon.pokemon.icons.small
            }
        };
    
        self.pokemonMarkers.push(pokemonMarker);
    }
    
    console.log(self.pokemonMarkers);
});