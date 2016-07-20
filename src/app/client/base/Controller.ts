import {Message} from "./Message";

const registerIpc = require("electron-ipc-tunnel/server").default;

export class Controller
{
    protected messages:Message[];

    constructor()
    {
        this.messages = [];
    }

    protected initSelf(instance)
    {
        var controllerName = instance.constructor.name.replace(/Controller/g, "").toLowerCase();
        var proto = Object.getPrototypeOf(instance);

        for (let key of Object.getOwnPropertyNames(proto))
        {
            // If this is the constructor, don't do anything
            if (key === "constructor")
                continue;

            // If this is not a function, don't do anything
            if (typeof instance[key] !== "function")
                continue;

            // Otherwise, add the function as a message
            let message = new Message(controllerName + "/" + key, instance[key]);
            this.messages.push(message);
        }

        // Then init the events
        this.initEvents();
    }

    private initEvents()
    {
        // Loop through all the messages and hook up the events
        for (let message of this.messages)
        {
            // Register the message to the IPC
            registerIpc(message.channel, function (reply, request)
            {
                // Return with whatever the message handler returns
                return message.listener(request);
            });
        }
    }
}