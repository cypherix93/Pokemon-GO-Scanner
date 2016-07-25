"use strict";

import {Express} from "express";
import {ControllersConfig} from "./ControllersConfig";
import {ErrorsConfig} from "./ErrorsConfig";

export class RoutesConfig
{
    public static init(app:Express)
    {
        console.log("=> Setting up Routes...");

        // Dynamically setup controller routes
        ControllersConfig.init(app);

        // Setup error handlers for all routes
        ErrorsConfig.init(app);
    }
}