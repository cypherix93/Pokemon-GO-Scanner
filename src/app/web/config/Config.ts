import path = require("path");

const rootPath = path.normalize(__dirname + "/../..");

const config = {
    development: {
        rootPath: rootPath,
        port: process.env.PORT || 32598,
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:32600",
            credentials: true
        },
        winston: {
            level: "debug"
        }
    },
    production: {
        rootPath: rootPath,
        port: 80,
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        },
        winston: {
            level: "info"
        }
    }
};

class Configuration
{
    public current;

    public environment:string;

    constructor(environment)
    {
        this.environment = environment.toLowerCase();

        if (this.isProduction())
        {
            this.current = config.production;
        }
        else
        {
            this.current = config.development;
        }
    }

    public isProduction()
    {
        return this.environment === "production";
    }

    public isDevelopment()
    {
        return this.environment !== "production";
    }
}

export const Config = new Configuration(process.env.NODE_ENV || "development");