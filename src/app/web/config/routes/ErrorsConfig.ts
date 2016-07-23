import {Express, ErrorRequestHandler} from "express";

export class ErrorsConfig
{
    public static init(app:Express)
    {
        // Handle all application errors
        app.use(function (err, req, res, next)
        {
            return res.status(500).send(err.stack);
        } as ErrorRequestHandler);
    }
}