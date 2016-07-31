import {PokeIO} from "../io/PokeIO";
import {Logger} from "../helpers/Logger";

import Timer = NodeJS.Timer;

const defaultLocation = "Times Square, NY";
const defaultProvider = "ptc";

export class PokeWorkerBase
{
    public io:PokeIO;

    public username:string;
    public password:string;
    public location:string;
    public provider:string;

    private pingTimer:Timer;
    private pingIntervalTime = 60000;

    constructor(username:string, password:string, provider?:string, location?:string)
    {
        this.username = username;
        this.password = password;
        this.location = location || defaultLocation;
        this.provider = provider || defaultProvider;
    }

    public async init():Promise<void>
    {
        this.io = new PokeIO();

        // Init the IO
        await this.io.init(this.username, this.password, this.location, this.provider);

        if(this.pingTimer)
            clearInterval(this.pingTimer);

        // On an interval, ping Niantic to make sure they don't drop our session
        this.pingTimer = setInterval(() => this.ping(), this.pingIntervalTime);
    }

    protected async ping(tries?:number):Promise<void>
    {
        // Just get the player profile as a ping
        try
        {
            await this.io.getProfile();
        }
        catch (err)
        {
            if (tries && tries > 5)
            {
                Logger.error(err.stack);
                throw err;
            }

            // If ping fails, reset IO and try again
            await this.init();

            await this.ping((tries || 1) + 1);
        }

        Logger.debug(`API Pinged on worker "${this.username}" at ${new Date().toISOString()}`);
    }
}
