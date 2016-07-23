import bodyParser = require("body-parser");

import {RoutesConfig} from "./routes/RoutesConfig";
import {Express} from "express";
import {Config} from "./Config";

import cookieParser = require("cookie-parser");
import cors = require("cors");

export class Bootstrapper
{
    public static bootstrap(app:Express)
    {
        console.log("=> Bootstrapping application...");

        // Configure express middlewares
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(cookieParser());
        app.use(cors(Config.current.cors));

        // Setup routes
        RoutesConfig.init(app);
    }
}