import {Request, Response} from "express";
import {JsonController} from "routing-controllers/decorator/Controllers";
import {Get, Post} from "routing-controllers/decorator/Methods";
import {Req, Res} from "routing-controllers/decorator/Params";

import _ = require("lodash");

import {MapPokemon} from "../viewmodels/map/MapPokemon";
import {PokeIOWorker} from "../workers/PokeIOWorker";
import {PokemonWorker} from "../workers/PokemonWorker";

@JsonController("/pokemon")
export class PokemonController
{
    @Post("/getMapPokemons")
    public async getMapPokemons(@Req() request:Request):Promise<any>
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

        var markers = await PokemonWorker.getPokemonMarkers(latitude, longitude);

        return {
            success: true,
            data: markers
        };
    }
}