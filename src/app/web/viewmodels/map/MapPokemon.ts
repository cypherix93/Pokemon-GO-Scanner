import {MapObject} from "./MapObject";
import {Pokemon} from "../../../core/models/Pokemon";
import {MapObjectType} from "./MapObjectType";

export class MapPokemon extends MapObject
{
    public pokedexId:number;

    public expirationTime:number;

    constructor(latitude:number, longitude:number, pokedexId:number)
    {
        super(latitude, longitude, MapObjectType.pokemon);

        this.pokedexId = pokedexId;

        this.id = this.generateMapId();
    }

    protected generateMapId():string
    {
        return super.generateMapId(`PKMN${this.pokedexId}|`);
    }
}