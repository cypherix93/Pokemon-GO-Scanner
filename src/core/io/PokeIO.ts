import request = require("request");
import q = require("q");

import {Logger} from "../helpers/Logger";
import {PokeIOBase} from "./PokeIOBase";
import {PlayerProfile} from "../models/PlayerProfile";

export class PokeIO extends PokeIOBase
{
    public async getProfile():PlayerProfile
    {
        var request = [
            new this.requestEnvelope.Requests(2)
        ];

        var apiResponse = await this.makeApiRequest(this.player.apiEndpoint, request) as any;

        var responseProfile = apiResponse.payload[0].profile;

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

        profile.dailyBonus.nextCollectTimestamp = responseProfile.daily_bonus.NextCollectTimestampMs;
        profile.dailyBonus.nextDefenderBonusCollectTimestamp = responseProfile.daily_bonus.NextDefenderBonusCollectTimestampMs;

        return profile;
    };

    public async getHeartbeat()
    {
        var requestEnvelope = this.requestEnvelope;

        // var m;
        //
        // var m4 = new requestEnvelope.Requests();
        // m = requestEnvelope.MessageSingleInt();
        // m.f1 = new Date().getTime();
        // m4.message = m.SerializeToString();
        //
        // var m5 = requestEnvelope.Requests();
        // m = requestEnvelope.MessageSingleString();
        // m.bytes = "05daf51635c82611d1aac95c0b051d3ec088a930";
        // m5.message = m.SerializeToString();
        //
        // var requests = [
        //     new requestEnvelope.Requests(106),
        //     new requestEnvelope.Requests(),
        //     m4,
        //     new requestEnvelope.Requests(),
        //     m5
        // ];

        var requests = [
            new this.requestEnvelope.Requests(2)
        ];

        var apiResponse = await this.makeApiRequest(this.player.apiEndpoint, requests) as any;

        var payload = apiResponse.payload[0];

        console.log(JSON.stringify(apiResponse.payload));

        Logger.info("Heartbeat");

        var heartbeat = this.responseEnvelope.HeartbeatPayload();
        heartbeat.ParseFromString(payload);
        return heartbeat;
    }
}
