AngularApp.service("InfoWindowService", function InfoWindowService($q, $compile, $templateCache)
{
    var self = this;
    
    var pokemonWindowTemplate = $templateCache.get("templates/core/templates/PokemonInfoWindow.template.html");
    
    self.getPokemonInfoWindowTemplate = function (scope)
    {
        return $compile(pokemonWindowTemplate)(scope);
    };
});