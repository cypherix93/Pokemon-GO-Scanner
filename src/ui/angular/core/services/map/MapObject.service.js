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
        else if(marker.type === "arena")
        {
            def.resolve(composeMarkerWithArena(marker));
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
                
                marker.icon = {
                    iconUrl: IconHelperService.getPokemonSmallIconPath(marker.pokedexId),
                    iconAnchor: [24, 24],
                    popupAnchor: [0, -30],
                    layer: marker.type
                };
                
                delete marker.pokedexId;
                
                def.resolve(marker);
            });
        
        return def.promise;
    }
    
    function composeMarkerWithPokestop(marker)
    {
        var def = $q.defer();
        
        var icon;
        if(marker.lured)
            icon = IconHelperService.getPokestopLuredIconPath();
        else
            icon = IconHelperService.getPokestopIconPath();
        
        marker.icon = {
            iconUrl: icon,
            iconAnchor: [8, 25],
            popupAnchor: [0, -30],
            layer: marker.type
        };
        
        def.resolve(marker);
        
        return def.promise;
    }
    
    function composeMarkerWithArena(marker)
    {
        var def = $q.defer();
                
        marker.icon = {
            iconUrl: IconHelperService.getPokemonTeamIcon(marker.team),
            iconAnchor: [20, 20],
            popupAnchor: [0, -28],
            layer: marker.type
        };
        
        def.resolve(marker);
        
        return def.promise;
    }
});