import path = require("path");

import {PokemonRepository} from "../data/PokemonRepository";

export class Pokemon
{
    public pokedexId:number;

    public name:string;
    public type: string;

    public height: string;
    public weight: string;

    public candy: string;
    public egg: string;

    constructor(pokedexId:number)
    {
        this.pokedexId = pokedexId;

        var pokemonData = PokemonRepository.getPokemon(pokedexId);

        this.name = pokemonData.name;
        this.type = pokemonData.type;
        this.height = pokemonData.height;
        this.weight = pokemonData.weight;
        this.candy = pokemonData.candy;
        this.egg = pokemonData.egg;
    }
}