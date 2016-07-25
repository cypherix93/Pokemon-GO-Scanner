const jsonfile = require("jsonfile");
import path = require("path");

import {Pokemon} from "../models/Pokemon";

const pokemonData = jsonfile.readFileSync(path.join(__dirname, "../../data/pokemons.json")).pokemon as any[];

export class PokemonRepository
{
    public static getPokemon(pokedexId:number):Pokemon
    {
        var pokemon = pokemonData.filter(p => (p.id | 0) === pokedexId)[0];

        return pokemon || null;
    }
}