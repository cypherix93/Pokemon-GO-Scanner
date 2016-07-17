/// <reference path="../typings/index.d.ts" />

import yargs = require("yargs");
import {Application} from "./core/Application";

class PokemonGoScanner
{
    public static main()
    {

    }

    private static processArgs()
    {
        var args = yargs.argv;
        
        Application.args.location = args.l || args.location || "Stony Brook, NY";

        Application.args.username = args.u || args.user || "cypherix93";
        Application.args.password = args.p || args.password || "asdfghjkl";
        Application.args.provider = args.r || args.provider || "ptc";
    }
}