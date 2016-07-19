import request = require("request");
import q = require("q");

import {Logger} from "../helpers/Logger";
import {PokeIOBase} from "./PokeIOBase";
import {PlayerProfile} from "../models/PlayerProfile";

export class PokeIO extends PokeIOBase
{
    public async getProfile():Promise<PlayerProfile>
    {
        var request = [
            new this.requestEnvelope.Requests(2)
        ];

        var apiResponse = await this.makeApiRequest(this.player.apiEndpoint, request) as any;

        var responseProfile = this.responseEnvelope.ProfilePayload.decode(apiResponse.payload[0]).profile;

        Logger.info("Logged in!");

        var profile = new PlayerProfile();

        profile.username = responseProfile.username;
        profile.team = responseProfile.team;
        profile.tutorial = responseProfile.tutorial;
        profile.avatar = responseProfile.avatar;

        profile.storage.pokemon = responseProfile.poke_storage;
        profile.storage.items = responseProfile.item_storage;
        profile.pokecoins = responseProfile.currency[0].amount;
        profile.stardust = responseProfile.currency[1].amount;

        return profile;
    };
}
