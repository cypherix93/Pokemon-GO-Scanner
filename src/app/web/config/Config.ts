import path = require("path");

export class Config
{
    private static rootPath = path.normalize(__dirname + "/../..");

    private static appConfig = {
        rootPath: Config.rootPath,
        port: process.env.PORT || 8080,
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:9090",
            credentials: true
        }
    };

    public static current = Config.appConfig;
}