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

    public async getHeartbeat()
    {
        var requestEnvelope = this.requestEnvelope;

        var walkBuffer = BufferHelper.getWalkBuffer(this.player.location.latitude, this.player.location.longitude);

        var walkData = new requestEnvelope.MessageQuad({
            f1: walkBuffer,
            f2: new Buffer(21).fill(0),
            lat: this.player.location.latitude,
            long: this.player.location.longitude
        });

        var requests = [
            new requestEnvelope.Requests(106, walkData.encode().toBuffer()),
            new requestEnvelope.Requests(126),
            new requestEnvelope.Requests(4, (new requestEnvelope.Unknown3(Date.now().toString())).encode().toBuffer()),
            new requestEnvelope.Requests(129),
            new requestEnvelope.Requests(5, "05daf51635c82611d1aac95c0b051d3ec088a930")
        ];

        var apiResponse = await this.makeApiRequest(this.player.apiEndpoint, requests) as any;

        var payload = apiResponse.payload[0];

        console.log(apiResponse);

        Logger.info("Heartbeat");

        var heartbeat = this.responseEnvelope.HeartbeatPayload.decode(payload);

        console.log(heartbeat);

        return heartbeat;
    }
}
