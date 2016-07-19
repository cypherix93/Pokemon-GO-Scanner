import request = require("request");
import q = require("q");

import {Logger} from "../helpers/Logger";
import {ProtoBuilder} from "../proto/ProtoBuilder";
import {ApiHandler} from "./ApiHandler";
import {Player} from "../models/Player";
import {EventEmitter} from "events";

var api_url = "https://pgorelease.nianticlabs.com/plfe/rpc";

export abstract class PokeIOBase
{
    public events:EventEmitter;

    public playerInfo:Player;

    public protoRequestEnvelope;
    public protoResponseEnvelope;

    constructor()
    {
        this.playerInfo = new Player();

        this.events = new EventEmitter();
    }

    public async init(username, password, location, provider)
    {
        if (provider !== "ptc" && provider !== "google")
        {
            throw new Error('Invalid provider');
        }

        // Set provider
        this.playerInfo.provider = provider;

        // Build proto
        var proto = ProtoBuilder.buildPokemonProto();
        this.protoRequestEnvelope = proto.request;
        this.protoResponseEnvelope = proto.response;

        // Updating location
        this.setLocation(location);

        // Getting access token
        this.playerInfo.accessToken = await this.getAccessToken(username, password);

        // Getting api endpoint
        this.playerInfo.apiEndpoint = await this.getApiEndpoint();
    }

    protected makeApiRequest(endpoint, access_token, requests)
    {
        var def = q.defer();

        // Auth
        var auth = new this.protoRequestEnvelope.AuthInfo({
            provider: this.playerInfo.provider,
            token: new this.protoRequestEnvelope.AuthInfo.JWT(access_token, 59)
        });

        var request = new this.protoRequestEnvelope({
            unknown1: 2,
            rpc_id: 8145806132888207460,

            requests: requests,

            latitude: this.playerInfo.location.latitude,
            longitude: this.playerInfo.location.longitude,

            auth: auth,
            unknown12: 989
        });

        var protobuf = request.encode().toBuffer();

        var options = {
            url: endpoint,
            body: protobuf,
            encoding: null,
            headers: {
                "User-Agent": "Niantic App"
            }
        } as any;

        ApiHandler.request.post(options, (err, response, body) =>
        {
            if (!response || !body)
            {
                Logger.error("RPC Server offline");

                throw new Error("RPC Server offline");
            }

            try
            {
                var response = this.protoResponseEnvelope.decode(body);

                def.resolve(response);
            }
            catch (e)
            {
                if (e.decoded)
                {
                    Logger.warn(e);
                    def.resolve(e.decoded);
                }
            }
        });

        return def.promise;
    }

    public abstract async getAccessToken(user, pass):Promise<string>;

    public abstract async getApiEndpoint():Promise<string>;

    public abstract async getProfile();
}
