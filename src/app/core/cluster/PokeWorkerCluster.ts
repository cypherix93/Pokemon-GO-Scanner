import {Account} from "../models/Account";
import {PokeWorker} from "./PokeWorker";
import {Logger} from "../helpers/Logger";

export class PokeWorkerCluster
{
    private static _workers:PokeWorker[];

    public static async init(accounts:Account[]):Promise<void>
    {
        PokeWorkerCluster._workers = [];

        var workerInitPromises = [];

        for (let account of accounts)
        {
            let worker = new PokeWorker(account);
            let workerInitPromise = worker.init();

            workerInitPromises.push(workerInitPromise);

            PokeWorkerCluster._workers.push(worker);

            //await new Promise(resolve => setTimeout(() => resolve(), 500));
        }

        await Promise.all(workerInitPromises);

        Logger.info(`Worker cluster ready!`);
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

                let idleWorker = await PokeWorkerCluster.getNextIdleWorker();

                let heartbeatPromise = idleWorker.doHeartbeat(newLat, newLng);
                heartbeatPromises.push(heartbeatPromise);
            }
        }

        var heartbeats = await Promise.all(heartbeatPromises) as any[];

        return heartbeats.filter(x => !!x);
    }

    private static async getNextIdleWorker():Promise<PokeWorker>
    {
        return PokeWorkerCluster._workers
            .filter(w => w.isIdle())[0];
    }
}
