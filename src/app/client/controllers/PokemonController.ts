import q = require("q");
import {Controller} from "../base/Controller";
import {MapPokemon} from "../../core/models/map/MapPokemon";

export class PokemonController extends Controller
{
    constructor()
    {
        super();

        this.initSelf(this);
    }

    public async getMapPokemons(latitude:number, longitude:number):Promise<MapPokemon[]>
    {

    }
}