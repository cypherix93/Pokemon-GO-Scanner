import {Request, Response} from "express";
import {JsonController} from "routing-controllers/decorator/Controllers";
import {Get, Post} from "routing-controllers/decorator/Methods";
import {Req, Res} from "routing-controllers/decorator/Params";

import _ = require("lodash");

import {MapPokemon} from "../viewmodels/map/MapPokemon";
import {Application} from "../../core/Application";

@JsonController("/pokemon")
export class PokemonController
{
    @Post("/getMapPokemons")
    public async getMapPokemons(@Req() request: Request)
    {
        var io = await Application.getIO();

        var latitude = parseFloat(request.body.latitude);
        var longitude = parseFloat(request.body.longitude);

        var heartbeat = await io.getHeartbeat(latitude, longitude);

        var pokemons = _.flatten(heartbeat.cells.map(x => x.MapPokemon)) as any[];

        var markers = [];

        for (let pokemon of pokemons)
        {
            let latitude = pokemon.Latitude;
            let longitude = pokemon.Longitude;
            let pokemonId = pokemon.PokedexTypeId;

            let mapPokemon = new MapPokemon(latitude, longitude, pokemonId);

            let pokemonMarker = {
                id: mapPokemon.id,
                coords: mapPokemon.coords
            };

            markers.push(pokemonMarker);
        }

        return {
            success: true,
            data: markers
        };
    }
}