import {Pokemon} from "../Pokemon";
import {MapObject} from "./MapObject";

export class MapPokemon extends MapObject
{
    public pokemon:Pokemon;

    constructor(latitude:number, longitude:number, pokemonId:number)
    {
        super(latitude, longitude);

        this.pokemon = new Pokemon(pokemonId);
    }
}