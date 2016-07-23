import {Express} from "express";
import {useExpressServer} from "routing-controllers";

import path = require("path");

import {Config} from "../Config";

export class ControllersConfig
{
    public static init(app:Express)
    {
        // Register controllers routes in our express application
        useExpressServer(app, {
            controllerDirs: [path.join(Config.current.rootPath, "web/controllers")]
        });
    }
}