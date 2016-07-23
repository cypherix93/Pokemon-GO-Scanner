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

        var mapPokemons = _.flatten(heartbeat.cells.map(x => x.MapPokemon)) as any[];
        var wildPokemons = _.flatten(heartbeat.cells.map(x => x.WildPokemon)) as any[];

        var markers = [];

        for (let pokemon of mapPokemons)
        {
            let latitude = pokemon.Latitude;
            let longitude = pokemon.Longitude;
            let pokemonId = pokemon.PokedexTypeId;

            let pokemonMarker = new MapPokemon(latitude, longitude, pokemonId);

            markers.push(pokemonMarker);
        }

        for (let pokemon of wildPokemons)
        {
            let latitude = pokemon.Latitude;
            let longitude = pokemon.Longitude;
            let pokemonId = pokemon.pokemon.PokemonId;

            let pokemonMarker = new MapPokemon(latitude, longitude, pokemonId);

            markers.push(pokemonMarker);
        }

        return {
            success: true,
            data: markers
        };
    }
}