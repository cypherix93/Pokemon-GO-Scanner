import {Request, Response} from "express";
import {JsonController} from "routing-controllers/decorator/Controllers";
import {Get, Post} from "routing-controllers/decorator/Methods";
import {Req, Res} from "routing-controllers/decorator/Params";

@JsonController("/config")
export class ConfigController
{
    @Get("/getGoogleMapsApiKey")
    public getGoogleMapsApiKey()
    {
        return {
            success: true,
            data: process.env.GOOGLE_MAPS_API_KEY
        };
    }
}