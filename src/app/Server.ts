/// <reference path="../../typings/index.d.ts" />

import express = require("express");
import {Config} from "./web/config/Config";
import {Bootstrapper} from "./web/config/Bootstrapper";

export class Server
{
    public static main()
    {
        const app = express();

        // Bootstrap the application and couple the middlewares
        Bootstrapper.bootstrap(app);

        // Start up the server
        console.log("=> Starting Server...");

        var port = Config.current.port;
        app.listen(port, function ()
        {
            console.log("\nMagic is happening at http://localhost:" + port);
        });
    }
}
// Start app
Server.main();