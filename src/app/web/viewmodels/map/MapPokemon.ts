import {MapObject} from "./MapObject";
import {MapObjectType} from "../enums/MapObjectType";

export class MapPokemon extends MapObject
{
    public pokedexId:number;

    public expirationTime:number;

    constructor(latitude:number, longitude:number, pokedexId:number)
    {
        super(latitude, longitude, MapObjectType.pokemon);

        this.pokedexId = pokedexId;

        this.generateMapId();
    }

    protected generateMapId():string
    {
        return super.generateMapId(`PKMN${this.pokedexId}|`);
    }
}