import {PlayerProfile} from "../../core/models/PlayerProfile";
import {PokeIOApplication} from "../../core/PokeIOApplication";
import {GeocoderHelper} from "../../core/helpers/GeocoderHelper";
import {CacheManager} from "../cache/CacheManager";

export class PokeIOWorker
{
    public static async getProfile():Promise<PlayerProfile>
    {
        var io = await PokeIOApplication.getIO();

        return await PokeIOWorker.retryOnIllegalBuffer(() => io.getProfile());
    }

    public static async getHeartbeatMapWithCoordinates(latitude:number, longitude:number, maxSteps = 10):Promise<any>
    {
        var step = 0.0005;
        var upperBound = (maxSteps / 2) * step;
        var lowerBound = -upperBound;

        var heartbeatPromises = [];
        for (let i = lowerBound; i <= upperBound; i += step)
        {
            for (let j = lowerBound; j <= upperBound; j += step)
            {
                let newLat = latitude + i;
                let newLng = longitude + j;

                let heartbeatPromise = PokeIOWorker.getHeartbeatWithCoordinates(newLat, newLng);
                heartbeatPromises.push(heartbeatPromise);
            }
        }

        return Promise.all(heartbeatPromises);
    }

    public static async getHeartbeatWithCoordinates(latitude:number, longitude:number):Promise<any>
    {
        var roundedLat = Math.round(latitude * 10000) / 10000;
        var roundedLong = Math.round(longitude * 10000) / 10000;

        var cacheKey = PokeIOWorker.getCacheKeyFromCoords(roundedLat, roundedLong);

        var heartbeat = await CacheManager.resolve(cacheKey, async() =>
        {
            var io = await PokeIOApplication.getIO();

            return await PokeIOWorker.retryOnIllegalBuffer(() => io.getHeartbeat(roundedLat, roundedLong));
        }, 6000);

        return heartbeat;
    }

    private static getCacheKeyFromCoords(latitude:number, longitude:number):string
    {
        return `LAT${latitude},LNG${longitude}`;
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
                    PokeIOApplication.resetIO();
                else
                    throw err;
            }
        }
    }
}