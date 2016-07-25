import {Logger} from "../../helpers/Logger";

export class ErrorHandler
{
    public static throwRPCOfflineError()
    {
        var logMessage = "RPC Server offline. Please try again later.";

        Logger.error(logMessage);

        throw logMessage;
    }
}
