import {MapObject} from "./MapObject";
import {PokemonViewModel} from "../PokemonViewModel";

export class MapPokemon extends MapObject
{
    public pokemon:PokemonViewModel;

    constructor(latitude:number, longitude:number, pokemonId:number)
    {
        super(latitude, longitude);

        this.pokemon = new PokemonViewModel(pokemonId);
    }
}