import path = require("path");
import {Config} from "../config/Config";

const pokemonImagesPath = path.join(Config.current.rootPath, "ui/assets/images/pokemon/go-sprites/");

export class Pokemon
{
    public pokedexId:number;

    public iconPath:string;

    constructor(pokedexId:number)
    {
        this.pokedexId = pokedexId;

        this.iconPath = path.join(pokemonImagesPath, `${pokedexId}.png`);
    }
}