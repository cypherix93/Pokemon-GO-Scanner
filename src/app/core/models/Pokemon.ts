import path = require("path");

import {Config} from "../config/Config";
import {PokemonRepository} from "../data/PokemonRepository";

const pokemonImagesPath = path.join(Config.current.rootPath, "ui/assets/images/pokemon/go-sprites/");

export class Pokemon
{
    public pokedexId:number;

    public name:string;
    public type: string;

    public height: string;
    public weight: string;

    public candy: string;
    public egg: string;

    public icons:{
        big:string,
        small:string
    };

    constructor(pokedexId:number)
    {
        this.pokedexId = pokedexId;

        this.icons = {
            big: path.join(pokemonImagesPath, `big/${pokedexId}.png`),
            small: path.join(pokemonImagesPath, `small/${pokedexId}.png`)
        };

        var pokemonData = PokemonRepository.getPokemon(pokedexId);

        this.name = pokemonData.name;
        this.type = pokemonData.type;
        this.height = pokemonData.height;
        this.weight = pokemonData.weight;
        this.candy = pokemonData.candy;
        this.egg = pokemonData.egg;
    }
}