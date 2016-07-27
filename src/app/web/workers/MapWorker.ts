import _ = require("lodash");

import {PokeIOWorker} from "./PokeIOWorker";
import {MapPokemon} from "../viewmodels/map/MapPokemon";
import {MapObject} from "../viewmodels/map/MapObject";
import {MapPokestop} from "../viewmodels/map/MapPokestop";

export class MapWorker
{
    public static async getMapMarkers(latitude:number, longitude:number):Promise<MapObject[]>
    {
        var heartbeats = await PokeIOWorker.getHeartbeatMapWithCoordinates(latitude, longitude);

        var cells = _.flatten(heartbeats.map(x => x.cells)) as any[];

        var pokemonMarkers = await MapWorker.getPokemonMarkers(cells);
        var pokestopMarkers = await MapWorker.getPokestopMarkers(cells);

        var markers = pokemonMarkers.concat(pokestopMarkers);

        return markers;
    }

    private static async getPokemonMarkers(cells:any[]):Promise<MapPokemon[]>
    {
        var wildPokemonCells = cells
            .filter(x => x.WildPokemon.length)
            .map(x => x.WildPokemon);

        var wildPokemons = _.flatten(wildPokemonCells) as any[];

        var pokemonMarkers = [];

        for (let pokemon of wildPokemons)
        {
            let latitude = pokemon.Latitude;
            let longitude = pokemon.Longitude;
            let pokedexId = pokemon.pokemon.PokemonId;

            let pokemonMarker = new MapPokemon(latitude, longitude, pokedexId);

            pokemonMarker.expirationTime = parseFloat(pokemon.TimeTillHiddenMs);

            pokemonMarkers.push(pokemonMarker);
        }

        var uniqueMarkers = MapObject.getUniqueMapObjects(pokemonMarkers) as MapPokemon[];

        return uniqueMarkers;
    }

    private static async getPokestopMarkers(cells:any[]):Promise<MapPokestop[]>
    {
        var pokestopCells = cells
            .filter(x => x.Fort.length && x.Fort.FortType && x.Fort.Enabled)
            .map(x => x.Fort);

        var pokestops = _.flatten(pokestopCells) as any[];

        var pokestopMarkers = [];

        for (let pokestop of pokestops)
        {
            let latitude = pokestop.Latitude;
            let longitude = pokestop.Longitude;

            let pokestopMarker = new MapPokestop(latitude, longitude);

            if(pokestop.LureInfo)
            {
                var expirationMs = pokestop.LureInfo.LureExpiresTimestampMs.toNumber();

                pokestopMarker.setLure(expirationMs);
            }

            pokestopMarkers.push(pokestopMarker);
        }

        var uniqueMarkers = MapObject.getUniqueMapObjects(pokestopMarkers) as MapPokestop[];

        return uniqueMarkers;
    }
}
