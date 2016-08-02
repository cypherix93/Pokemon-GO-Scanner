import {CacheManager} from "../cache/CacheManager";
import {PokeWorkerBase} from "./PokeWorkerBase";
import {Account} from "../models/Account";
import {Location} from "../models/Location";
import {Logger} from "../helpers/Logger";

export class PokeWorker extends PokeWorkerBase
{
    constructor(account:Account, location?:Location)
    {
        super(account, location);
    }

    public async doHeartbeat(latitude:number, longitude:number):Promise<any>
    {
        this.setBusy();

        var roundedLat = Math.round(latitude * 10000) / 10000;
        var roundedLong = Math.round(longitude * 10000) / 10000;

        var cacheKey = `LAT${roundedLat},LNG${roundedLong}`;

        var cacheFallback = async() =>
        {
            return await this.io.getHeartbeat(roundedLat, roundedLong);
        };

        var heartbeat = await CacheManager.resolveAsync(cacheKey, cacheFallback, 60000);

        if(heartbeat)
        {
            Logger.debug(`Heartbeat succeeded on worker "${this.account.username}" at ${latitude}, ${longitude}`);
        }
        else
        {
            Logger.error(`Heartbeat failed on worker "${this.account.username}" at ${latitude}, ${longitude}`);
        }

        this.setIdle();

        return heartbeat;
    }
}
