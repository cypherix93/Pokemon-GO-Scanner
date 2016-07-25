AngularApp.service("InfoWindowService", function InfoWindowService($q, $compile, $templateCache, $timeout)
{
    var self = this;
    
    var typeColors = {
        Normal: "#A8A878",
        Fire: "#F08030",
        Fighting: "#C03028",
        Water: "#6890F0",
        Flying: "#A890F0",
        Grass: "#78C850",
        Poison: "#A040A0",
        Electric: "#F8D030",
        Ground: "#E0C068",
        Psychic: "#F85888",
        Rock: "#B8A038",
        Ice: "#98D8D8",
        Bug: "#A8B820",
        Dragon: "#7038F8",
        Ghost: "#705898",
        Dark: "#705848",
        Steel: "#B8B8D0",
        Fairy: "#EE99AC"
    };
    
    var pokemonWindowTemplate = $templateCache.get("templates/core/templates/PokemonInfoWindow.template.html");
    
    self.getPokemonInfoWindowTemplate = function (scope)
    {
        return $compile(pokemonWindowTemplate)(scope);
    };
});