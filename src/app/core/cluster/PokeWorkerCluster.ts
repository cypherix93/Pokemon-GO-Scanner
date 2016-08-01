import {Account} from "../models/Account";
import {PokeWorker} from "./PokeWorker";

export class PokeWorkerCluster
{
    private static _workers:PokeWorker[];

    public static async init(accounts:Account[]):Promise<void>
    {
        PokeWorkerCluster._workers = [];

        for (let account of accounts)
        {
            let worker = await new PokeWorker(account.username, account.password, account.provider);
            await worker.init();

            PokeWorkerCluster._workers.push(worker);
        }
    }

    public static async getHeartbeatMapWithCoordinates(latitude:number, longitude:number, maxSteps = 1):Promise<any>
    {
        var roundedLat = Math.round(latitude * 1000) / 1000;
        var roundedLong = Math.round(longitude * 1000) / 1000;

        var step = 0.0005;
        var upperBound = (maxSteps / 2) * step;
        var lowerBound = -upperBound;

        var heartbeatPromises = [];
        for (let i = lowerBound; i <= upperBound; i += step)
        {
            for (let j = lowerBound; j <= upperBound; j += step)
            {
                let newLat = roundedLat + i;
                let newLng = roundedLong + j;

                let heartbeatPromise = PokeWorkerCluster.getHeartbeatWithCoordinates(newLat, newLng);
                heartbeatPromises.push(heartbeatPromise);
            }
        }

        var heartbeats = await Promise.all(heartbeatPromises) as any[];

        return heartbeats.filter(x => !!x);
    }

    private static async getHeartbeatWithCoordinates(latitude:number, longitude:number)
    {
        var idleWorker = await PokeWorkerCluster.getNextIdleWorker();

        return await idleWorker.doHeartbeat(latitude, longitude);
    }

    private static async getNextIdleWorker():Promise<PokeWorker>
    {
        return PokeWorkerCluster._workers[0];
    }
}
