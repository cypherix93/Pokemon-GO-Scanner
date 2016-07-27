import {Request, Response} from "express";
import {JsonController} from "routing-controllers/decorator/Controllers";
import {Get, Post} from "routing-controllers/decorator/Methods";
import {Req, Res} from "routing-controllers/decorator/Params";

import _ = require("lodash");

import {MapPokemon} from "../viewmodels/map/MapPokemon";
import {PokeIOWorker} from "../workers/PokeIOWorker";
import {MapWorker} from "../workers/MapWorker";
import {PokemonRepository} from "../../core/data/PokemonRepository";
import {Pokemon} from "../../core/models/Pokemon";

@JsonController("/map")
export class MapController
{
    @Post("/getMapObjects")
    public async getMapObjects(@Req() request:Request):Promise<any>
    {
        var latitude = parseFloat(request.body.latitude);
        var longitude = parseFloat(request.body.longitude);

        if(!latitude || !longitude)
        {
            return {
                success: false,
                message: "Latitude and Longitude must both be provided."
            };
        }

        var markers = await MapWorker.getMapMarkers(latitude, longitude);

        return {
            success: true,
            data: {
                center: {
                    latitude,
                    longitude
                },
                markers
            }
        };
    }
}