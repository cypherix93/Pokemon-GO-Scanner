import {Request, Response} from "express";
import {JsonController} from "routing-controllers/decorator/Controllers";
import {Get, Post} from "routing-controllers/decorator/Methods";
import {Req, Res} from "routing-controllers/decorator/Params";

import {PokeIOWorker} from "../workers/PokeIOWorker";
import {GeocoderHelper} from "../../core/helpers/GeocoderHelper";

@JsonController("/location")
export class LocationController
{
    @Post("/reverseGeocode")
    public async reverseGeocode(@Req() request:Request)
    {
        var location = request.body.location;

        var coords = await GeocoderHelper.resolveLocationByName(location);

        return {
            success: true,
            data: coords
        };
    }

    @Post("/geocode")
    public async geocode(@Req() request:Request)
    {
        var latitude = request.body.latitude;
        var longitude = request.body.longitude;

        var coords = await GeocoderHelper.resolveLocationByCoordinates(latitude, longitude);

        return {
            success: true,
            data: coords
        };
    }
}