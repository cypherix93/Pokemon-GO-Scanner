import path = require("path");

import {Pokemon} from "../../core/models/Pokemon";
import {Config} from "../config/Config";

const pokemonImagesPath = path.join(Config.current.rootPath, "ui/assets/images/pokemon/go-sprites/");

export class PokemonViewModel extends Pokemon
{
    public icons:{
        big:string,
        small:string
    };

    constructor(pokedexId:number)
    {
        super(pokedexId);

        this.icons = {
            big: path.join(pokemonImagesPath, `big/${pokedexId}.png`),
            small: path.join(pokemonImagesPath, `small/${pokedexId}.png`)
        };
    }
}