import {PokemonClubAuthHandler} from "./PokemonClubAuthHandler";

export class Auth
{
    public static async loginWithPokemonClub(user:string, pass:string)
    {
        return await PokemonClubAuthHandler.authenticate(user, pass);
    }
}