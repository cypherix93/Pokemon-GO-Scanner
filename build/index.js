"use strict";
const pokeio_1 = require("./PokeIO/pokeio");
var location = {
    type: "name",
    name: process.env.PGO_LOCATION || "Stony Brook, NY"
};
var username = process.env.PGO_USERNAME || "cypherix93";
var password = process.env.PGO_PASSWORD || "asdfghjkl";
var provider = process.env.PGO_PROVIDER || "ptc";
pokeio_1.PokeIO.init(username, password, location, provider, function (err) {
    if (err)
        throw err;
    console.log("[i] Current location: " + pokeio_1.PokeIO.playerInfo.locationName);
    console.log("[i] lat/long/alt: : " + pokeio_1.PokeIO.playerInfo.latitude + " " + pokeio_1.PokeIO.playerInfo.longitude + " " + pokeio_1.PokeIO.playerInfo.altitude);
    pokeio_1.PokeIO.GetProfile(function (err, profile) {
        if (err)
            throw err;
        console.log("[i] Username: " + profile.username);
        console.log("[i] Poke Storage: " + profile.poke_storage);
        console.log("[i] Item Storage: " + profile.item_storage);
        var poke = 0;
        if (profile.currency[0].amount) {
            poke = profile.currency[0].amount;
        }
        console.log("[i] Pokecoin: " + poke);
        console.log("[i] Stardust: " + profile.currency[1].amount);
    });
});
