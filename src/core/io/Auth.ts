import {ApiHandler} from "./ApiHandler";
import {Logger} from "../helpers/Logger";
import q = require("q");

var api_url = 'https://pgorelease.nianticlabs.com/plfe/rpc';
var login_url = 'https://sso.pokemon.com/sso/login?service=https%3A%2F%2Fsso.pokemon.com%2Fsso%2Foauth2.0%2FcallbackAuthorize';
var login_oauth = 'https://sso.pokemon.com/sso/oauth2.0/accessToken';

// Google Parts

export class Auth
{
    
}


module.exports = {
    GoogleAccount: function (user, pass, self, callback)
    {
        self.google.login(user, pass, android_id, function (err, data)
        {
            if (data)
            {
                self.google.oauth(user, data.masterToken, data.androidId, oauth_service, app, client_sig, function (err, data)
                {
                    if (err)
                    {
                        return callback(err, null);
                    }
                    callback(null, data.Auth);
                });
            }
        });
    }
};
