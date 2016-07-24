AngularApp.service("IconHelperService", function IconHelperService()
{
    var self = this;
    
    self.getPokemonIconPath = function(pokedexId)
    {
        return "assets/images/pokemon/go-sprites/small/" + pokedexId + ".png";
    };
});