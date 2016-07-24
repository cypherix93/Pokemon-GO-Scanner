import yargs = require("yargs");
import _ = require("lodash");

import {PokeIO} from "./io/PokeIO";
import {ArgsHelper} from "./helpers/ArgsHelper";
import {PlayerProfile} from "./models/PlayerProfile";

export class Application
{
    private static _io:PokeIO;

    public static async getIO():Promise<PokeIO>
    {
        if (Application._io)
            return Application._io;

        return await Application.init();
    }

    public static async getProfile():Promise<PlayerProfile>
    {
        var io = await Application.getIO();

        return await Application.retryOnIllegalBuffer(() => io.getProfile());
    }

    public static async init():Promise<PokeIO>
    {
        var args = ArgsHelper.getArgs();

        var io = new PokeIO();

        await io.init(args.username, args.password, args.location, args.provider);

        Application._io = io;

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

    private static retryOnIllegalBuffer(action:Function, maxTries = 5)
    {
        var tries = 0;

        while (tries < maxTries)
        {
            try
            {
                return action();
            }
            catch (err)
            {
                if (err.message == "Illegal buffer")
                    Application._io = undefined;
                else
                    throw err;
            }
        }
    }
}