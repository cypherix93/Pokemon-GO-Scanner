import {Logger} from "../helpers/Logger";
import q = require("q");

import {ApiHandler} from "../io/handlers/ApiHandler";

const login_url = "https://sso.pokemon.com/sso/login?service=https%3A%2F%2Fsso.pokemon.com%2Fsso%2Foauth2.0%2FcallbackAuthorize";
const login_oauth = "https://sso.pokemon.com/sso/oauth2.0/accessToken";

export class PokemonClubAuthHandler
{
    public static async authenticate(user:string, pass:string):Promise<string>
    {
        var data = await PokemonClubAuthHandler.makeLoginGetRequest();

        var ticket = await PokemonClubAuthHandler.getAuthTicket(data, user, pass);

        var token = await PokemonClubAuthHandler.getOAuthToken(ticket) as string;

        Logger.debug(`Session token: ${token}`);

        return token;
    }

    private static async makeLoginGetRequest()
    {
        var def = q.defer();

        var options = {
            url: login_url,
            headers: {
                "User-Agent": "niantic"
            }
        } as any;

        ApiHandler.request.get(options, (err, response, body) =>
        {
            if (err)
                throw err;

            //Parse body
            try
            {
                var parsedBody = JSON.parse(body);

                def.resolve(parsedBody);
            }
            catch (err)
            {
                Logger.error(`Invalid response from PTC:GET => \n ${body}`);
                throw new Error(`Invalid response from PTC:GET`);
            }
        });

        return await def.promise;
    }

    private static async getAuthTicket(data, user, pass)
    {
        var def = q.defer();

        var options = {
            url: login_url,
            form: {
                lt: data.lt,
                execution: data.execution,
                _eventId: "submit",
                username: user,
                password: pass
            },
            headers: {
                "User-Agent": "niantic"
            }
        } as any;

        ApiHandler.request.post(options, (err, response, body) =>
        {
            if (err)
                throw err;

            var ticket = response.headers["location"].split("ticket=")[1];

            def.resolve(ticket);
        });

        return await def.promise;
    }

    private static async getOAuthToken(ticket)
    {
        var def = q.defer();

        var options = {
            url: login_oauth,
            form: {
                client_id: "mobile-app_pokemon-go",
                redirect_uri: "https://www.nianticlabs.com/pokemongo/error",
                client_secret: "w8ScCUXJQc6kXKw8FiOhd8Fixzht18Dq3PEVkUCP5ZPxtgyWsbTvWHFLm2wNY0JR",
                grant_type: "refresh_token",
                code: ticket
            },
            headers: {
                "User-Agent": "niantic"
            }
        } as any;

        ApiHandler.request.post(options, (err, response, body) =>
        {
            if (err)
                throw err;

            var token = body.split("token=")[1];

            if (!token)
            {
                Logger.error(`Invalid OAuth response: ${body}`);
                throw new Error("Invalid OAuth response");
            }

            token = token.split("&")[0];

            if (!token)
                throw new Error("Login failed");

            def.resolve(token);
        });

        return await def.promise;
    }
}