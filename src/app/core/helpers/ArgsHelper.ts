import yargs = require("yargs");

export class ArgsHelper
{
    public static getArgs()
    {
        var args = yargs.argv;

        var location = args.l || args.location || "Times Square, NY";

        var username = args.u || args.user || "fakefakefaker";
        var password = args.p || args.password || "asdfghjkl";
        var provider = args.r || args.provider || "ptc";

        if (provider !== "ptc" && provider !== "google")
        {
            throw new Error("Invalid provider");
        }

        return {
            location: location,
            username: username,
            password: password,
            provider: provider,
        }
    }
}