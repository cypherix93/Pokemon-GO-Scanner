/// <reference path="../../typings/index.d.ts" />

import {Application} from "./core/Application";

class PokemonGoScanner
{
    public static main()
    {
        Application.init()
            .then(() => process.exit(0))
            .catch(err =>
            {
                console.error(err);
            });
    }
}

PokemonGoScanner.main();