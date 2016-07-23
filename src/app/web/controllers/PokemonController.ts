import {Request, Response} from "express";
import {JsonController} from "routing-controllers/decorator/Controllers";
import {Get, Post} from "routing-controllers/decorator/Methods";
import {Req, Res} from "routing-controllers/decorator/Params";

import {MapPokemon} from "../viewmodels/map/MapPokemon";

@JsonController("/games")
export class PokemonController
{
    @Get("/getMapPokemons")
    public async getMapPokemons(latitude:number, longitude:number):Promise<MapPokemon[]>
    {
        return null;
    }
}