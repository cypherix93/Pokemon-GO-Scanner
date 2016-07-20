import path = require("path");

export class Config
{
    private static rootPath = path.normalize(__dirname + "/../../..");

    private static appConfig = {
        development: {
            rootPath: Config.rootPath
        }
    };

    public static current = Config.appConfig.development;
}