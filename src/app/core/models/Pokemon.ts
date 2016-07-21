import path = require("path");
import {Config} from "../config/Config";

const pokemonImagesPath = path.join(Config.current.rootPath, "ui/assets/images/pokemon/go-sprites/");

export class Pokemon
{
    public pokedexId:number;

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
        }
    }
}