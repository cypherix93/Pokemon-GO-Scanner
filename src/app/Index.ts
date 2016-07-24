/// <reference path="../../typings/index.d.ts" />

import {PokeIOApplication} from "./core/PokeIOApplication";

class PokemonGoScanner
{
    public static main()
    {
        PokeIOApplication.init()
            .then(() => process.exit(0))
            .catch(err =>
            {
                console.error(err);
            });
    }
}

PokemonGoScanner.main();