import {CacheManager} from "../cache/CacheManager";
import {PokeWorkerBase} from "./PokeWorkerBase";

export class PokeWorker extends PokeWorkerBase
{
    constructor(username:string, password:string, provider?:string, location?:string)
    {
        super(username, password, provider, location);
    }

    public async doHeartbeat(latitude:number, longitude:number):Promise<any>
    {
        var roundedLat = Math.round(latitude * 10000) / 10000;
        var roundedLong = Math.round(longitude * 10000) / 10000;

        var cacheKey = `LAT${roundedLat},LNG${roundedLong}`;

        var cacheFallback = async() =>
        {
            return await this.io.getHeartbeat(roundedLat, roundedLong);
        };

        var heartbeat = await CacheManager.resolveAsync(cacheKey, cacheFallback, 60000);

        return heartbeat;
    }
}
