import {PlayerProfile} from "../../core/models/PlayerProfile";
import {Application} from "../../core/Application";
import {GeocoderHelper} from "../../core/helpers/GeocoderHelper";
import {CacheManager} from "../cache/CacheManager";

export class PokeIOWorker
{
    public static async getProfile():Promise<PlayerProfile>
    {
        var io = await Application.getIO();

        return await PokeIOWorker.retryOnIllegalBuffer(() => io.getProfile());
    }

    public static async getHeartbeatWithLocation(location:string):Promise<any>
    {
        var {latitude, longitude} = await GeocoderHelper.resolveLocationByName(location);

        return PokeIOWorker.getHeartbeatWithCoordinates(latitude, longitude);
    }

    public static async getHeartbeatWithCoordinates(latitude:number, longitude:number):Promise<any>
    {
        var cacheKey = PokeIOWorker.getCacheKeyFromCoords(latitude, longitude);

        var heartbeat = await CacheManager.resolve(cacheKey, async () =>
        {
            var io = await Application.getIO();

            return await PokeIOWorker.retryOnIllegalBuffer(() => io.getHeartbeat(latitude, longitude));
        }, 6000);

        return heartbeat;
    }

    private static getCacheKeyFromCoords(latitude:number, longitude:number):string
    {
        var roundedLat = Math.round(latitude * 1000) / 1000;
        var roundedLong = Math.round(longitude * 1000) / 1000;

        return `LAT${roundedLat},LNG${roundedLong}`;
    }

    private static retryOnIllegalBuffer<T>(action:() => T, maxTries = 5):T
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
                if (err.message === "Illegal buffer")
                    Application.resetIO();
                else
                    throw err;
            }
        }
    }
}