AngularApp.service("IconHelperService", function IconHelperService()
{
    var self = this;
    
    self.getPokemonSmallIconPath = function (pokedexId)
    {
        return "assets/images/pokemon/go-sprites/small/" + pokedexId + ".png";
    };
    self.getPokemonBigIconPath = function (pokedexId)
    {
        return "assets/images/pokemon/go-sprites/big/" + pokedexId + ".png";
    };
    self.getPokestopIconPath = function ()
    {
        return "assets/images/map/pokestop.png";
    };
    self.getPokestopLuredIconPath = function ()
    {
        return "assets/images/map/pokestoppink.png";
    };
    self.getPokemonTeamIcon = function (team)
    {
        var arenaLogo;
        
        switch (team)
        {
            case "Mystic":
                arenaLogo = "arena_blue";
                break;
            case "Instinct":
                arenaLogo = "arena_yellow";
                break;
            case "Valor":
                arenaLogo = "arena_red";
                break;
            default:
                arenaLogo = "arena_white";
                break;
        }
        
        return "assets/images/map/" + arenaLogo + ".png";
    };
});