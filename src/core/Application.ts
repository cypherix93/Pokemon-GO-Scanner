import yargs = require("yargs");
import {PokeIO} from "./io/PokeIO";
import {Logger} from "./helpers/Logger";

export class Application
{
    public static async init()
    {
        var args = Application.getArgs();

        var io = new PokeIO();

        await io.init(args.username, args.password, args.location, args.provider);

        Logger.info(`Current location: ${io.playerInfo.locationName}`);
        Logger.info(`[i] lat/long/alt: : ${io.playerInfo.latitude} ${io.playerInfo.longitude}`);

        var profile = await io.getProfile();

        Logger.info(`Username: ${profile.username}`);
        Logger.info(`Poke Storage: ${profile.poke_storage}`);
        Logger.info(`Item Storage: ${profile.item_storage}`);

        Logger.info(`Pokecoin: ${profile.currency[0].amount}`);
        Logger.info(`Stardust: ${profile.currency[1].amount}`);
    }

    private static getArgs()
    {
        var args = yargs.argv;

        var location = args.l || args.location || "Stony Brook, NY";

        var username = args.u || args.user || "cypherix93";
        var password = args.p || args.password || "asdfghjkl";
        var provider = args.r || args.provider || "ptc";

        return {
            location: {
                type: "name",
                name: location
            },
            username: username,
            password: password,
            provider: provider,
        }
    }
}