import {Config} from "./Config";
import {Application} from "../Application";
import path = require("path");

const recursiveReaddirSync = require("recursive-readdir-sync");

export class Bootstrapper
{
    public static bootstrap()
    {
        Bootstrapper.configControllers();
    }

    private static configControllers()
    {
        var controllerPath = path.join(Config.current.rootPath, "app/client/controllers");
        var controllerFiles = recursiveReaddirSync(controllerPath);

        for (let file of controllerFiles)
        {
            let relativePath = path.relative(__dirname, file);

            let controllerName = path.basename(relativePath, ".js");

            let controller = require(relativePath)[controllerName];

            // Instantiate the controller
            new controller();
        }
    }
}
