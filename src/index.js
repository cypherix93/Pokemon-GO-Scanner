var Pokeio = require("./PokeIO/poke.io");

//Set environment variables or replace placeholder text
var location = {
    type: "name",
    name: process.env.PGO_LOCATION || "Stony Brook, NY"
};

var username = process.env.PGO_USERNAME || "cypherix93";
var password = process.env.PGO_PASSWORD || "asdfghjkl";
var provider = process.env.PGO_PROVIDER || "ptc";

Pokeio.init(username, password, location, provider, function (err)
{
    if (err) throw err;
    
    console.log("[i] Current location: " + Pokeio.playerInfo.locationName);
    console.log("[i] lat/long/alt: : " + Pokeio.playerInfo.latitude + " " + Pokeio.playerInfo.longitude + " " + Pokeio.playerInfo.altitude);
    
    Pokeio.GetProfile(function (err, profile)
    {
        if (err) throw err;
        
        console.log("[i] Username: " + profile.username);
        console.log("[i] Poke Storage: " + profile.poke_storage);
        console.log("[i] Item Storage: " + profile.item_storage);
        
        var poke = 0;
        if (profile.currency[0].amount)
        {
            poke = profile.currency[0].amount;
        }
        
        console.log("[i] Pokecoin: " + poke);
        console.log("[i] Stardust: " + profile.currency[1].amount);
    });
});