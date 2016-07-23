import {Express} from "express";

import "reflect-metadata";
import {registerActionsInExpressApp} from "routing-controllers/routing-controllers";

import path = require("path");

import {Config} from "../Config";

export class ControllersConfig
{
    public static init(app:Express)
    {
        // Register controllers routes in our express application
        registerActionsInExpressApp(app, [path.join(Config.current.rootPath, "web/controllers")]);
    }
}