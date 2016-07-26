import {Request, Response} from "express";
import {JsonController} from "routing-controllers/decorator/Controllers";
import {Get, Post} from "routing-controllers/decorator/Methods";
import {Req, Res} from "routing-controllers/decorator/Params";

import _ = require("lodash");

import {MapPokemon} from "../viewmodels/map/MapPokemon";
import {PokeIOWorker} from "../workers/PokeIOWorker";
import {PokemonWorker} from "../workers/PokemonWorker";
import {PokemonRepository} from "../../core/data/PokemonRepository";
import {Pokemon} from "../../core/models/Pokemon";

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

    @Post("/getPokemonById")
    public async getPokemonById(@Req() request:Request):Promise<any>
    {
        var pokedexId = request.body.pokedexId;

        if(!pokedexId)
        {
            return {
                success: false,
                message: "Pokedex ID must both be provided."
            };
        }

        var pokemon = await PokemonRepository.getPokemon(pokedexId);

        return {
            success: true,
            data: pokemon
        };
    }

    @Post("/getAllPokemons")
    public async getAllPokemons():Promise<any>
    {
        var pokemons = await PokemonRepository.getAllPokemons();

        return {
            success: true,
            data: pokemons
        };
    }

}