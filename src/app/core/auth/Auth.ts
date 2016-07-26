import {PokemonClubAuthHandler} from "./PokemonClubAuthHandler";
import {GoogleAuthHandler} from "./GoogleAuthHandler";
import {Logger} from "../helpers/Logger";

export class Auth
{
    public static async getAccessToken(user, pass, provider):Promise<string>
    {
        Logger.debug("Logging in with user: " + user);

        if (provider === "ptc")
        {
            return await Auth.loginWithPokemonClub(user, pass);
        }
        else if (provider === "google")
        {
            return await Auth.loginWithGoogle(user, pass);
        }

        return null;
    };

    public static async loginWithPokemonClub(user:string, pass:string)
    {
        return await PokemonClubAuthHandler.authenticate(user, pass);
    }

    public static async loginWithGoogle(user:string, pass:string)
    {
        return await GoogleAuthHandler.authenticate(user, pass);
    }
}