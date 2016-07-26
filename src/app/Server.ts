/// <reference path="../../typings/index.d.ts" />

import express = require("express");

import {Config} from "./web/config/Config";
import {Bootstrapper} from "./web/config/Bootstrapper";
import {Logger} from "./core/helpers/Logger";

export class Server
{
    public static main()
    {
        const app = express();

        Logger.info(`Server configuration set to '${Config.environment.toUpperCase()}'.`);

        // Bootstrap the application and couple the middlewares
        Bootstrapper.bootstrap(app)
            .then(() =>
            {
                // Start up the server
                Logger.info("Starting Server...");

                var port = Config.current.port;
                app.listen(port, function ()
                {
                    Logger.info("Magic is happening at http://localhost:" + port);
                });
            });
    }
}
// Start app
Server.main();