import {Account} from "./models/Account";
const jsonfile = require("jsonfile");
import path = require("path");
import {PokeWorkerCluster} from "./cluster/PokeWorkerCluster";

export class PokeScannerApplication
{
    public static async init()
    {
        var accounts = PokeScannerApplication.loadAccounts();

        await PokeWorkerCluster.init(accounts);
    }

    private static loadAccounts():Account[]
    {
        return jsonfile.readFileSync(path.join(__dirname, "../data/accounts.json")) as Account[];
    }
}
