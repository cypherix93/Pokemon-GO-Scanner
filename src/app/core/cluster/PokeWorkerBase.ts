import {PokeIO} from "../io/PokeIO";
import {Logger} from "../helpers/Logger";
import {Account} from "../models/Account";
import {Location} from "../models/Location";

import Timer = NodeJS.Timer;

const defaultLocation = {
    latitude: 22.5726,
    longitude: 88.3639
};
const defaultProvider = "ptc";

export class PokeWorkerBase
{
    public io:PokeIO;

    public account:Account;
    public location:Location;

    private pingTimer:Timer;
    private pingIntervalTime = 60000;

    private idle:boolean;

    constructor(account:Account, location?:Location)
    {
        this.account = account;

        if (!this.account.provider)
            this.account.provider = defaultProvider;

        if (!location)
        {
            this.location = new Location();
            this.location.latitude = defaultLocation.latitude;
            this.location.longitude = defaultLocation.longitude;
        }
    }

    public async init():Promise<void>
    {
        try
        {
            this.io = new PokeIO();

            // Init the IO
            await this.io.init(this.account, this.location);

            if (this.pingTimer)
                clearInterval(this.pingTimer);

            // On an interval, ping Niantic to make sure they don't drop our session
            this.pingTimer = setInterval(() => this.ping(), this.pingIntervalTime);

            this.setIdle();

            Logger.info(`Worker "${this.account.username}" initialized at ${new Date().toISOString()}`);
        }
        catch(err)
        {
            Logger.error(`Worker "${this.account.username}" failed to initialize at ${new Date().toISOString()}`);

            await this.init();
        }
    }

    protected async ping():Promise<void>
    {
        this.setBusy();

        try
        {
            // Just get the player profile as a ping
            await this.io.getProfile();

            Logger.debug(`API pinged on worker "${this.account.username}" at ${new Date().toISOString()}`);
        }
        catch(err)
        {
            Logger.error(`API ping failed on worker "${this.account.username}" at ${new Date().toISOString()}`);

            await this.ping();
        }

        this.setIdle();
    }

    protected setIdle()
    {
        this.idle = true;
    }
    protected setBusy()
    {
        this.idle = false;
    }
    public isIdle():boolean
    {
        return this.idle;
    }
}
