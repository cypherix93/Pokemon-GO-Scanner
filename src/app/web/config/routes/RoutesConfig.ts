"use strict";

import {Express} from "express";
import {ControllersConfig} from "./ControllersConfig";
import {ErrorsConfig} from "./ErrorsConfig";
import {Logger} from "../../../core/helpers/Logger";

export class RoutesConfig
{
    public static init(app:Express)
    {
        Logger.info("Setting up Routes...");

        // Dynamically setup controller routes
        ControllersConfig.init(app);

        // Setup error handlers for all routes
        ErrorsConfig.init(app);
    }
}