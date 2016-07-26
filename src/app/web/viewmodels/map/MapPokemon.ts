import {MapObject} from "./MapObject";
import {Pokemon} from "../../../core/models/Pokemon";

export class MapPokemon extends MapObject
{
    public pokedexId:number;

    public expirationTime:number;

    constructor(latitude:number, longitude:number, pokedexId:number)
    {
        super(latitude, longitude);

        this.pokedexId = pokedexId;

        this.id = this.generateMapId();
    }

    protected generateMapId():string
    {
        var stringToEncode = `PKMN${this.pokedexId}|LAT${this.coords.latitude}|LONG${this.coords.longitude}`;

        return new Buffer(stringToEncode).toString("base64");
    }
}