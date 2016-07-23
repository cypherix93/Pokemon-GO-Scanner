AngularApp.controller("HomeController", function HomeController($scope, HeartbeatTestService, uiGmapGoogleMapApi, IPCService)
{
    const MapPokemon = apprequire("./core/models/map/MapPokemon").MapPokemon;
    
    const self = this;
    
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
    
    uiGmapGoogleMapApi.then(function(maps)
    {
        $scope.$watch(
            () => self.map.getGMap().getCenter(),
            (newVal, oldVal) =>
            {
                self.current.coords = {
                    latitude: newVal.lat(),
                    longitude: newVal.lng()
                };
            }
        );
        
        IPCService.send("pokemon/initApp")
            .then(() => console.log("INITED"))
            .catch(err =>
            {
                console.error(err);
            });
    });
});