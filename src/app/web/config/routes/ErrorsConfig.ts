import {Express, ErrorRequestHandler} from "express";

export class ErrorsConfig
{
    public static init(app)
    {
        // Handle all application errors
        app.use(function (err, req, res, next)
        {
            if (res.headersSent)
            {
                return next(err);
            }

            return res.status(500).send(err.stack);
        } as ErrorRequestHandler);
    }
}