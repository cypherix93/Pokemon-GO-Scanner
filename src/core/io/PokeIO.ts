import request = require("request");
import q = require("q");

import {Logger} from "../helpers/Logger";
import {Auth} from "../auth/Auth";
import {PokeIOBase} from "./PokeIOBase";

const geocoder = require("geocoder");

var api_url = 'https://pgorelease.nianticlabs.com/plfe/rpc';

export class PokeIO extends PokeIOBase
{
    public async getAccessToken(user, pass):Promise<string>
    {
        Logger.info("Logging in with user: " + user);

        if (this.playerInfo.provider === "ptc")
        {
            return await Auth.loginWithPokemonClub(user, pass);
        }
        else if (this.playerInfo.provider === "google")
        {
            return await Auth.loginWithGoogle(user, pass);
        }

        return null;
    };

    public async getApiEndpoint():Promise<string>
    {
        var requestEnvelope = this.protoRequestEnvelope;

        var req = [];
        req.push(
            new requestEnvelope.Requests(2),
            new requestEnvelope.Requests(126),
            new requestEnvelope.Requests(4),
            new requestEnvelope.Requests(129),
            new requestEnvelope.Requests(5, new requestEnvelope.Unknown3('4a2e9bc330dae60e7b74fc85b98868ab4700802e'))
        );

        var apiResponse = await this.makeApiRequest(api_url, this.playerInfo.accessToken, req) as any;

        var endpoint = `https://${apiResponse.api_url}/rpc`;

        Logger.info("Received API Endpoint: " + endpoint);

        return endpoint;
    };

    public async getProfile()
    {
        var request = new this.protoRequestEnvelope.Requests(2);

        var apiResponse = await this.makeApiRequest(this.playerInfo.apiEndpoint, this.playerInfo.accessToken, request) as any;

        if (apiResponse.payload[0].profile)
        {
            Logger.info("Logged in!");
        }

        return apiResponse.payload[0].profile;
    };
}
