import _ = require("lodash");

import {MapPokemon} from "../viewmodels/map/MapPokemon";
import {MapObject} from "../viewmodels/map/MapObject";
import {MapPokestop} from "../viewmodels/map/MapPokestop";
import {MapArena} from "../viewmodels/map/MapArena";
import {Team} from "../viewmodels/enums/Team";
import {PokeWorkerCluster} from "../../core/cluster/PokeWorkerCluster";

export class MapWorker
{
    public static async getMapMarkers(latitude:number, longitude:number):Promise<MapObject[]>
    {
        var heartbeats = await PokeWorkerCluster.getHeartbeatMapWithCoordinates(latitude, longitude);

        var cells = _.flatten(heartbeats.map(x => x.cells)) as any[];

        var pokemonMarkers = await MapWorker.getPokemonMarkers(cells);
        var pokestopMarkers = await MapWorker.getPokestopMarkers(cells);
        var arenaMarkers = await MapWorker.getArenaMarkers(cells);

        var markers = pokemonMarkers.concat(pokestopMarkers).concat(arenaMarkers);

        return markers;
    }

    private static async getPokemonMarkers(cells:any[]):Promise<MapObject[]>
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

        var uniqueMarkers = MapObject.getUniqueMapObjects(pokemonMarkers);

        return uniqueMarkers;
    }

    private static async getPokestopMarkers(cells:any[]):Promise<MapObject[]>
    {
        var pokestopCells = cells
            .filter(x => x.Fort.length)
            .map(x => x.Fort);

        var pokestops = _.flatten(pokestopCells)
            .filter(x => x.FortType && x.Enabled) as any[];

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

        var uniqueMarkers = MapObject.getUniqueMapObjects(pokestopMarkers);

        return uniqueMarkers;
    }

    private static async getArenaMarkers(cells:any[]):Promise<MapObject[]>
    {
        var arenaCells = cells
            .filter(x => x.Fort.length)
            .map(x => x.Fort);

        var arenas = _.flatten(arenaCells)
            .filter(x => !x.FortType && x.Enabled) as any[];

        var arenaMarkers = [];

        for (let arena of arenas)
        {
            let latitude = arena.Latitude;
            let longitude = arena.Longitude;

            let arenaMarker = new MapArena(latitude, longitude);

            if(arena.Team === 1)
                arenaMarker.setTeam(Team.Mystic);
            else if(arena.Team === 2)
                arenaMarker.setTeam(Team.Valor);
            else if(arena.Team === 3)
                arenaMarker.setTeam(Team.Instinct);

            if(arenaMarker.team)
                arenaMarker.prestige = arena.GymPoints.toNumber();

            arenaMarkers.push(arenaMarker);
        }

        var uniqueMarkers = MapObject.getUniqueMapObjects(arenaMarkers);

        return uniqueMarkers;
    }
}
