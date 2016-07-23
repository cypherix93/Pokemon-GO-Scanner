import path = require("path");

export class Config
{
    private static rootPath = path.normalize(__dirname + "/../..");

    private static appConfig = {
        rootPath: Config.rootPath,
        port: process.env.PORT || 31363,
        cors: {
            origin: "http://localhost:32363",
            credentials: true
        }
    };

    public static current = Config.appConfig;
}