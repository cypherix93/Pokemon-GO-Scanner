import request = require("request");
import q = require("q");

import {Logger} from "../helpers/Logger";
import {Auth} from "../auth/Auth";
import {ProtoBuilder} from "../proto/ProtoBuilder";
import {ApiHandler} from "./ApiHandler";

const geocoder = require("geocoder");
const events = require("events");

var EventEmitter = events.EventEmitter;

var api_url = 'https://pgorelease.nianticlabs.com/plfe/rpc';

export class PokeIO
{
    public events = new EventEmitter();

    public playerInfo = {
        accessToken: "",
        debug: true,
        latitude: 0,
        longitude: 0,
        altitude: 0,
        locationName: "",
        provider: "",
        apiEndpoint: ""
    };

    public protoRequestEnvelope;
    public protoResponseEnvelope;

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
        var request = this.protoRequestEnvelope.Requests(2);

        var apiResponse = await this.makeApiRequest(this.playerInfo.apiEndpoint, this.playerInfo.accessToken, request) as any;

        if (apiResponse.payload[0].profile)
        {
            Logger.info("Logged in!");
        }

        return apiResponse.payload[0].profile;
    };

    public async getLocation(callback)
    {
        var def = q.defer();

        geocoder.reverseGeocode(this.playerInfo.latitude, this.playerInfo.longitude, function (err, data)
        {
            Logger.info(`lat/long/alt: ${this.playerInfo.latitude} ${this.playerInfo.longitude} ${this.playerInfo.altitude}`);

            if (data.status == "ZERO_RESULTS")
            {
                Logger.error("Location not found");
                throw new Error("Location not found");
            }

            def.resolve(data.results[0].formatted_address);
        });

        return def.promise;
    };

    public async setLocation(location)
    {
        var def = q.defer();

        if (location.type != "name" && location.type != "coords")
        {
            throw new Error('Invalid location type');
        }

        if (location.type === "name")
        {
            if (!location.name)
            {
                throw new Error("You should add a location name");
            }
            var locationName = location.name;

            geocoder.geocode(locationName, function (err, data)
            {
                if (err || data.status == "ZERO_RESULTS")
                {
                    throw new Error("location not found");
                }

                var latitude = data.results[0].geometry.location.lat;
                var longitude = data.results[0].geometry.location.lng;

                this.setLocationCoords(latitude, longitude, locationName);

                def.resolve({
                    latitude,
                    longitude,
                    locationName
                });
            });
        }
        else if (location.type === "coords")
        {
            if (!location.coords)
            {
                throw new Error("Coords object missing");
            }

            var latitude = location.coords.latitude || this.playerInfo.latitude;
            var longitude = location.coords.longitude || this.playerInfo.longitude;

            geocoder.reverseGeocode(latitude, longitude, function (err, data)
            {
                if (data.status != 'ZERO_RESULTS')
                {
                    var locationName = data.results[0].formatted_address;

                    this.setLocationCoords(latitude, longitude, locationName);
                }

                def.resolve({
                    latitude,
                    longitude,
                    locationName
                });
            });
        }
    };

    public getLocationCoords()
    {
        return {
            latitude: this.playerInfo.latitude,
            longitude: this.playerInfo.longitude,
            locationName: this.playerInfo.locationName
        };
    };

    public setLocationCoords(latitude, longitude, locationName)
    {
        this.playerInfo.latitude = latitude;
        this.playerInfo.longitude = longitude;
        this.playerInfo.locationName = locationName;
    };

    private makeApiRequest(endpoint, access_token, requests)
    {
        var def = q.defer();

        // Auth
        var auth = this.protoRequestEnvelope.AuthInfo({
            provider: this.playerInfo.provider,
            token: this.protoRequestEnvelope.AuthInfo.JWT(access_token, 59)
        });

        var request = this.protoRequestEnvelope({
            unknown1: 2,
            rpc_id: 8145806132888207460,

            requests: requests,

            latitude: this.playerInfo.latitude,
            longitude: this.playerInfo.longitude,
            altitude: this.playerInfo.altitude,

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

        ApiHandler.request.post(options, function (err, response, body)
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
}
