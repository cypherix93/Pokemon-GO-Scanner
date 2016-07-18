/// <reference path="../typings/index.d.ts" />
import {Application} from "./core/Application";

class PokemonGoScanner
{
    public static async main()
    {
        await Application.init();
    }
}

PokemonGoScanner.main();