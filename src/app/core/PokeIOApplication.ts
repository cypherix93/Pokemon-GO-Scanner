import yargs = require("yargs");
import _ = require("lodash");

import {PokeIO} from "./io/PokeIO";
import {ArgsHelper} from "./helpers/ArgsHelper";
import {PlayerProfile} from "./models/PlayerProfile";
import {GeocoderHelper} from "./helpers/GeocoderHelper";

export class PokeIOApplication
{
    private static _io:PokeIO;

    public static async getIO():Promise<PokeIO>
    {
        if (PokeIOApplication._io)
            return PokeIOApplication._io;

        return await PokeIOApplication.init();
    }

    public static resetIO()
    {
        PokeIOApplication._io = undefined;
    }

    public static async init():Promise<PokeIO>
    {
        var args = ArgsHelper.getArgs();

        var io = new PokeIO();

        await io.init(args.username, args.password, args.location, args.provider);

        PokeIOApplication._io = io;

        // Logger.info(`Current location: ${io.player.location.name}`);
        // Logger.info(`Latitude / Longitude: ${io.player.location.latitude} ${io.player.location.longitude}`);
        //
        // var profile = await io.getProfile();
        //
        // Logger.info(`Username: ${profile.username}`);
        // Logger.info(`Team: ${profile.team}`);
        //
        // Logger.info(`Poke Storage: ${profile.storage.pokemon}`);
        // Logger.info(`Item Storage: ${profile.storage.items}`);
        //
        // Logger.info(`Pokecoin: ${profile.pokecoins}`);
        // Logger.info(`Stardust: ${profile.stardust}`);

        return io;
    }
}