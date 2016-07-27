AngularApp.service("IconHelperService", function IconHelperService()
{
    var self = this;
    
    self.getPokemonSmallIconPath = function(pokedexId)
    {
        return "assets/images/pokemon/go-sprites/small/" + pokedexId + ".png";
    };
    self.getPokemonBigIconPath = function(pokedexId)
    {
        return "assets/images/pokemon/go-sprites/big/" + pokedexId + ".png";
    };
    self.getPokestopIconPath = function()
    {
        return "assets/images/map/pokestop.png";
    };
    self.getPokestopLuredIconPath = function()
    {
        return "assets/images/map/pokestoppink.png";
    };
});