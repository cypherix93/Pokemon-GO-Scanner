import {Request, Response} from "express";
import {JsonController} from "routing-controllers/decorator/Controllers";
import {Get, Post} from "routing-controllers/decorator/Methods";
import {Req, Res} from "routing-controllers/decorator/Params";

import _ = require("lodash");

import {MapPokemon} from "../viewmodels/map/MapPokemon";
import {PokeIOWorker} from "../workers/PokeIOWorker";

@JsonController("/pokemon")
export class PokemonController
{
    @Post("/getMapPokemons")
    public async getMapPokemons(@Req() request:Request)
    {
        var latitude = parseFloat(request.body.latitude);
        var longitude = parseFloat(request.body.longitude);

        var heartbeats = await PokeIOWorker.getHeartbeatMapWithCoordinates(latitude, longitude);
        var cells = _.flatten(heartbeats.map(x => x.cells)) as any[];

        var mapPokemons = _.flatten(cells.map(x => x.MapPokemon)) as any[];
        var wildPokemons = _.flatten(cells.map(x => x.WildPokemon)) as any[];

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

        // Get unique markers
        var sortedMarkers = markers.sort((x, y) =>
        {
            var a = x.id;
            var b = y.id;

            if (a < b)
                return -1;

            if (a > b)
                return 1;

            return 0;
        });
        var uniqueMarkers = _.sortedUniqBy(sortedMarkers, "id");

        return {
            success: true,
            data: uniqueMarkers
        };
    }
}