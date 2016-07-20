angular.module("AngularApp")
    .service("IPCService", function IPCService()
    {
        const self = this;
    
        const IpcClient = require("electron-ipc-tunnel/client").default;
    
        const client = new IpcClient();

        self.send = function(channel, request)
        {
            return client.send(channel, request);
        }
    });