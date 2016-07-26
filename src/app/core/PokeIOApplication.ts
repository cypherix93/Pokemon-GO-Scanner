import yargs = require("yargs");
import _ = require("lodash");

import {PokeIO} from "./io/PokeIO";
import {ArgsHelper} from "./helpers/ArgsHelper";
import {Logger} from "./helpers/Logger";
import Timer = NodeJS.Timer;

export class PokeIOApplication
{
    private static _io:PokeIO;

    private static pingInterval:Timer;
    private static pingIntervalTime = 60000;


    public static async init():Promise<PokeIO>
    {
        var args = ArgsHelper.getArgs();

        var io = new PokeIO();

        await io.init(args.username, args.password, args.location, args.provider);

        PokeIOApplication._io = io;

        // On a 1 minute interval, ping Niantic to make sure they don't drop our session
        PokeIOApplication.pingInterval = setInterval(() => PokeIOApplication.ping(), PokeIOApplication.pingIntervalTime);

        return io;
    }

    public static async getIO():Promise<PokeIO>
    {
        if (PokeIOApplication._io)
            return PokeIOApplication._io;

        return await PokeIOApplication.init();
    }

    public static resetIO()
    {
        PokeIOApplication._io = undefined;

        clearInterval(PokeIOApplication.pingInterval);
    }

    public static async ping()
    {
        var io = await PokeIOApplication.getIO();

        // Just get the API endpoint as a ping
        io.player.apiEndpoint = await io.getApiEndpoint();

        await io.getProfile();

        Logger.debug(`API Pinged at ${new Date().toISOString()}`);
    }
}