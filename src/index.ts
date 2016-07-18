/// <reference path="../typings/index.d.ts" />
import {Application} from "./core/Application";

class PokemonGoScanner
{
    public static main()
    {
        Application.init()
            .then(() => process.exit(0))
            .catch(err =>
            {
                console.error(err);
            });
    }

    public static test()
    {
        var Pokeio = require('./core/io/lib/poke.io');

        var location = process.env.PGO_LOCATION || {'type': 'name', 'name': 'Stony Brook, NY'};
        var username = process.env.PGO_USERNAME || 'cypherix93';
        var password = process.env.PGO_PASSWORD || 'asdfghjkl';
        var provider = process.env.PGO_PROVIDER || 'ptc';

        Pokeio.init(username, password, location, provider, function (err)
        {
            if (err) throw err;

            console.log('[i] Current location: ' + Pokeio.playerInfo.locationName);
            console.log('[i] lat/long/alt: : ' + Pokeio.playerInfo.latitude + ' ' + Pokeio.playerInfo.longitude + ' ' + Pokeio.playerInfo.altitude);

            Pokeio.GetProfile(function (err, profile)
            {
                if (err) throw err;

                console.log('[i] Username: ' + profile.username);
                console.log('[i] Poke Storage: ' + profile.poke_storage);
                console.log('[i] Item Storage: ' + profile.item_storage);

                console.log('[i] Pokecoin: ' + profile.currency[0].amount);
                console.log('[i] Stardust: ' + profile.currency[1].amount);
            });
        });
    }
}

PokemonGoScanner.main();
// PokemonGoScanner.test();