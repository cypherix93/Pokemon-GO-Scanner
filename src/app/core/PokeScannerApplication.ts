import {Account} from "./models/Account";
const jsonfile = require("jsonfile");
import path = require("path");
import {PokeWorkerCluster} from "./cluster/PokeWorkerCluster";

export class PokeScannerApplication
{
    public static async init()
    {
        var accounts = await PokeScannerApplication.loadAccounts();

        await PokeWorkerCluster.init(accounts);
    }

    private static async loadAccounts():Promise<Account[]>
    {
        return await jsonfile.readFile(path.join(__dirname, "../data/accounts.json")) as Account[];
    }
}
