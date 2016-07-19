import request = require("request");
import q = require("q");

import {Logger} from "../helpers/Logger";
import {PokeIOBase} from "./PokeIOBase";

export class PokeIO extends PokeIOBase
{
    public async getProfile()
    {
        var request = new this.requestEnvelope.Requests(2);

        var apiResponse = await this.makeApiRequest(this.player.apiEndpoint, request) as any;

        if (apiResponse.payload[0].profile)
        {
            Logger.info("Logged in!");
        }

        return apiResponse.payload[0].profile;
    };
}
