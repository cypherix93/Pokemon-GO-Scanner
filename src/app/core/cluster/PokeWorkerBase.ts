import {PokeIO} from "../io/PokeIO";
import {Logger} from "../helpers/Logger";

import Timer = NodeJS.Timer;
import {RetryHelper} from "../helpers/RetryHelper";

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
        // Just get the player profile as a ping
        await RetryHelper.retryAsync(async() =>
        {
            this.io = new PokeIO();

            // Init the IO
            await this.io.init(this.username, this.password, this.location, this.provider);

            if (this.pingTimer)
                clearInterval(this.pingTimer);

            // On an interval, ping Niantic to make sure they don't drop our session
            this.pingTimer = setInterval(() => this.ping(), this.pingIntervalTime);
        });

        Logger.debug(`Worker "${this.username}" initialized at ${new Date().toISOString()}`);
    }

    protected async ping(tries?:number):Promise<void>
    {
        // Just get the player profile as a ping
        await RetryHelper.retryAsync(async() =>
        {
            await this.io.getProfile();
        });

        Logger.debug(`API Pinged on worker "${this.username}" at ${new Date().toISOString()}`);
    }
}
