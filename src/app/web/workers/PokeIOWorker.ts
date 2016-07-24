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

    public static async getHeartbeatMapWithCoordinates(latitude:number, longitude:number, maxSteps = 10):Promise<any>
    {
        var step = 0.0005;
        var upperBound = (maxSteps / 2) * step;
        var lowerBound = -upperBound;

        var heartbeats = [];
        for (let i = lowerBound; i <= upperBound; i += step)
        {
            for (let j = lowerBound; j <= upperBound; j += step)
            {
                let newLat = latitude + i;
                let newLng = longitude + j;

                let heartbeat = await PokeIOWorker.getHeartbeatWithCoordinates(newLat, newLng);
                heartbeats.push(heartbeat);
            }
        }

        return heartbeats;
    }

    public static async getHeartbeatWithLocation(location:string):Promise<any>
    {
        var {latitude, longitude} = await GeocoderHelper.resolveLocationByName(location);

        return PokeIOWorker.getHeartbeatWithCoordinates(latitude, longitude);
    }

    public static async getHeartbeatWithCoordinates(latitude:number, longitude:number):Promise<any>
    {
        var cacheKey = PokeIOWorker.getCacheKeyFromCoords(latitude, longitude);

        var heartbeat = await CacheManager.resolve(cacheKey, async() =>
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