import q = require("q");
import {Controller} from "../base/Controller";
import {MapPokemon} from "../../core/models/map/MapPokemon";
import {Application} from "../../core/Application";

export class PokemonController extends Controller
{
    constructor()
    {
        super();

        this.initSelf(this);
    }

    public async initApp()
    {
        await Application.init();
    }

    public async getMapPokemons(latitude:number, longitude:number):Promise<MapPokemon[]>
    {

    }
}