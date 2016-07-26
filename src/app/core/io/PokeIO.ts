import request = require("request");
import q = require("q");

import {Logger} from "../helpers/Logger";
import {PokeIOBase} from "./PokeIOBase";
import {PlayerProfile} from "../models/PlayerProfile";
import {BufferHelper} from "../helpers/BufferHelper";

export class PokeIO extends PokeIOBase
{
    public async getProfile():Promise<PlayerProfile>
    {
        var request = [
            new this.requestEnvelope.Requests(2)
        ];

        var apiResponse = await this.makeApiRequest(this.player.apiEndpoint, request) as any;

        var responseProfile = this.responseEnvelope.ProfilePayload.decode(apiResponse.payload[0]).profile;

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

    public async getHeartbeat(latitude:number, longitude:number)
    {
        var requestEnvelope = this.requestEnvelope;

        this.player.location.latitude = latitude;
        this.player.location.longitude = longitude;

        var walk = BufferHelper.getWalkBuffer(latitude, longitude);

        // Creating MessageQuad for Requests type=106
        var walkData = new requestEnvelope.MessageQuad({
            "f1": walk,
            "f2": new Array(21).fill(0),
            "lat": latitude,
            "long": longitude
        });

        var requests = [
            new requestEnvelope.Requests(106, walkData.encode().toBuffer()),
            new requestEnvelope.Requests(126),
            new requestEnvelope.Requests(4, new requestEnvelope.Unknown3(Date.now().toString()).encode().toBuffer()),
            new requestEnvelope.Requests(129),
            new requestEnvelope.Requests(5, new requestEnvelope.Unknown3("05daf51635c82611d1aac95c0b051d3ec088a930").encode().toBuffer())
        ];

        var apiResponse = await this.makeApiRequest(this.player.apiEndpoint, requests) as any;

        var payload = apiResponse.payload[0];

        Logger.debug(`Heartbeat at ${latitude}, ${longitude}`);

        var heartbeat = this.responseEnvelope.HeartbeatPayload.decode(payload);

        return heartbeat;
    }
}
