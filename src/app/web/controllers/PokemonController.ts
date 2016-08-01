import {Request, Response} from "express";
import {JsonController} from "routing-controllers/decorator/Controllers";
import {Get, Post} from "routing-controllers/decorator/Methods";
import {Req, Res} from "routing-controllers/decorator/Params";

import _ = require("lodash");

import {PokemonRepository} from "../../core/data/PokemonRepository";

@JsonController("/pokemon")
export class PokemonController
{
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