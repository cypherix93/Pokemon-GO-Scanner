import {MapObject} from "./MapObject";
import {Pokemon} from "../../../core/models/Pokemon";

export class MapPokemon extends MapObject
{
    public pokemon:Pokemon;

    constructor(latitude:number, longitude:number, pokemonId:number)
    {
        super(latitude, longitude);

        this.pokemon = new Pokemon(pokemonId);

        this.id = this.generateMapId();
    }

    protected generateMapId():string
    {
        var stringToEncode = `PKMN${this.pokemon.pokedexId}|LAT${this.coords.latitude}|LONG${this.coords.longitude}`;

        return new Buffer(stringToEncode).toString("base64");
    }
}