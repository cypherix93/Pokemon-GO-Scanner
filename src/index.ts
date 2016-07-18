/// <reference path="../typings/index.d.ts" />
import {Application} from "./core/Application";
import {Logger} from "./core/helpers/Logger";

class PokemonGoScanner
{
    public static main()
    {
        Application.init()
            .then(() => process.exit(1))
            .catch(err => err);
    }
}

PokemonGoScanner.main();