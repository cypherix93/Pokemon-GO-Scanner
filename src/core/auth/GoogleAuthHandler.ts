import {ApiHandler} from "../io/ApiHandler";

import {Logger} from "../helpers/Logger";
import q = require("q");

const GoogleOAuth = require("gpsoauthnode");

const android_id = "9774d56d682e549c";
const oauth_service = "audience:server:client_id:848232511240-7so421jotr2609rmqakceuu1luuq0ptb.apps.googleusercontent.com";
const app = "com.nianticlabs.pokemongo";
const client_sig = "321187995bc7cdc2b5fc91b11a96e2baa8602c62";

var googleOAuth = new GoogleOAuth();

export class GoogleAuthHandler
{
    public static async authenticate(user:string, pass:string):Promise<string>
    {
        var loginResult = await GoogleAuthHandler.makeLoginRequest(user, pass) as any;
        
        var oauthResult = await GoogleAuthHandler.makeOAuthRequest(user, loginResult.masterToken, loginResult.androidId);

        Logger.info("Session token: " + oauthResult);

        return oauthResult.toString();
    }

    private static makeLoginRequest(user, pass)
    {
        var def = q.defer();

        googleOAuth.login(user, pass, android_id, function (err, data)
        {
            if (err)
                throw err;

            def.resolve(data);
        });

        return def.promise;
    }

    private static makeOAuthRequest(user, masterToken, androidId)
    {
        var def = q.defer();

        googleOAuth.oauth(user, masterToken, androidId, oauth_service, app, client_sig, function (err, data)
        {
            if (err)
                throw err;

            def.resolve(data.Auth);
        });

        return def.promise;
    }
}