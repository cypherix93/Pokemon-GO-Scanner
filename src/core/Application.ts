import yargs = require("yargs");
import {PokeIO} from "./io/PokeIO";
import {Logger} from "./helpers/Logger";

export class Application
{
    public static async init()
    {
        Logger.info(`Initing App`);

        var args = Application.getArgs();

        var io = new PokeIO();

        await io.init(args.username, args.password, args.location, args.provider);

        Logger.info(`Current location: ${io.player.location.name}`);
        Logger.info(`Latitude / Longitude: ${io.player.location.latitude} ${io.player.location.longitude}`);

        var profile = await io.getProfile();

        Logger.info(`Username: ${profile.username}`);
        Logger.info(`Team: ${profile.team}`);

        Logger.info(`Poke Storage: ${profile.storage.pokemon}`);
        Logger.info(`Item Storage: ${profile.storage.items}`);

        Logger.info(`Pokecoin: ${profile.pokecoins}`);
        Logger.info(`Stardust: ${profile.stardust}`);

        var heartbeat = await io.getHeartbeat();

        console.log(heartbeat);

    }

    private static getArgs()
    {
        var args = yargs.argv;

        var location = args.l || args.location || "Times Square, NY";

        var username = args.u || args.user || "fakefakefaker";
        var password = args.p || args.password || "asdfghjkl";
        var provider = args.r || args.provider || "ptc";

        if (provider !== "ptc" && provider !== "google")
        {
            throw new Error("Invalid provider");
        }

        return {
            location: location,
            username: username,
            password: password,
            provider: provider,
        }
    }
}