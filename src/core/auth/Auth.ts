import {PokemonClubAuthHandler} from "./PokemonClubAuthHandler";
import {GoogleAuthHandler} from "./GoogleAuthHandler";

export class Auth
{
    public static async loginWithPokemonClub(user:string, pass:string)
    {
        return await PokemonClubAuthHandler.authenticate(user, pass);
    }

    public static async loginWithGoogle(user:string, pass:string)
    {
        return await GoogleAuthHandler.authenticate(user, pass);
    }
}