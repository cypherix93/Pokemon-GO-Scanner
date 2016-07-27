import _ = require("lodash");

import {PokeIOWorker} from "./PokeIOWorker";
import {MapPokemon} from "../viewmodels/map/MapPokemon";
import {MapObject} from "../viewmodels/map/MapObject";

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
        var wildPokemons = _.flatten(cells.map(x => x.WildPokemon)) as any[];

        var markers = [];

        for (let pokemon of wildPokemons)
        {
            let latitude = pokemon.Latitude;
            let longitude = pokemon.Longitude;
            let pokedexId = pokemon.pokemon.PokemonId;

            let pokemonMarker = new MapPokemon(latitude, longitude, pokedexId);

            pokemonMarker.expirationTime = parseFloat(pokemon.TimeTillHiddenMs);

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

        return uniqueMarkers;
    }

    private static async getPokestopMarkers(cells:any[]):Promise<MapPokemon[]>
    {
        var wildPokemons = _.flatten(cells.map(x => x.WildPokemon)) as any[];

        var markers = [];

        for (let pokemon of wildPokemons)
        {
            let latitude = pokemon.Latitude;
            let longitude = pokemon.Longitude;
            let pokedexId = pokemon.pokemon.PokemonId;

            let pokemonMarker = new MapPokemon(latitude, longitude, pokedexId);

            pokemonMarker.expirationTime = parseFloat(pokemon.TimeTillHiddenMs);

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

        return uniqueMarkers;
    }
}
