/// <reference path="../../typings/index.d.ts" />

import {Config} from "./core/config/Config";
import {Bootstrapper} from "./core/config/Bootstrap";

export class ElectronApp
{
    public static electron = require("electron");
    private static electronApp = ElectronApp.electron.app;

    public static mainWindow;

    public static main()
    {
        // Init the application and open the renderer view
        ElectronApp.init();

        // Bootstrap the main process and setup event handlers
        Bootstrapper.bootstrap();

        // Start up the app
        console.log("=> Starting Electron...");
    }

    public static init()
    {
        console.log("=> Bootstrapping application...");

        ElectronApp.initWindowEvents();
    }

    private static createMainWindow()
    {
        const BrowserWindow = ElectronApp.electron.BrowserWindow;

        var mainWindow = ElectronApp.mainWindow;

        // Create the browser window.
        mainWindow = new BrowserWindow({width: 800, height: 600});

        // and load the index.html of the app.
        mainWindow.loadURL("file://" + Config.current.rootPath + "/ui/index.html");

        // Open the DevTools.
        mainWindow.webContents.openDevTools();

        // Emitted when the window is closed.
        mainWindow.on('closed', function ()
        {
            mainWindow = null
        });
    }

    private static initWindowEvents()
    {
        ElectronApp.electronApp.on("ready", ElectronApp.createMainWindow);

        ElectronApp.electronApp.on("window-all-closed", function ()
        {
            if (process.platform !== "darwin")
            {
                ElectronApp.electronApp.quit();
            }
        });

        ElectronApp.electronApp.on('activate', function ()
        {
            if (ElectronApp.mainWindow === null)
            {
                ElectronApp.createMainWindow();
            }
        });
    }
}

// Start app
ElectronApp.main();