const jsonfile = require("jsonfile");
import path = require("path");

import {Pokemon} from "../models/Pokemon";
import {Config} from "../config/Config";

const pokemonData = jsonfile.readFileSync(path.join(Config.current.rootPath, "app/data/pokemons.json")).pokemon as any[];

export class PokemonRepository
{
    public static getPokemon(pokedexId:number):Pokemon
    {
        var pokemon = pokemonData.filter(p => p.id === pokedexId)[0];

        return pokemon || null;
    }
}