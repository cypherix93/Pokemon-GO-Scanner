import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import cors = require("cors");

import {RoutesConfig} from "./routes/RoutesConfig";
import {Config} from "./Config";
import {PokeIOApplication} from "../../core/PokeIOApplication";
import {Logger} from "../../core/helpers/Logger";

export class Bootstrapper
{
    public static async bootstrap(app)
    {
        Logger.info("Bootstrapping application...");

        // Configure express middlewares
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(cookieParser());
        app.use(cors(Config.current.cors));

        // Setup routes
        RoutesConfig.init(app);

        // Init PokeIO
        await PokeIOApplication.init();
    }
}