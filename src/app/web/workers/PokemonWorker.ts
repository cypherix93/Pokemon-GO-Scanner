import _ = require("lodash");

import {PokeIOWorker} from "./PokeIOWorker";
import {MapPokemon} from "../viewmodels/map/MapPokemon";

export class PokemonWorker
{
    public static async getPokemonMarkers(latitude:number, longitude:number):Promise<MapPokemon[]>
    {
        var heartbeats = await PokeIOWorker.getHeartbeatMapWithCoordinates(latitude, longitude);

        var cells = _.flatten(heartbeats.map(x => x.cells)) as any[];

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
