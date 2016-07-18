import request = require("request");
import q = require("q");

import {Logger} from "../helpers/Logger";
import {Auth} from "../auth/Auth";
import {ProtoBuilder} from "../proto/ProtoBuilder";
import {ApiHandler} from "./ApiHandler";

const geocoder = require("geocoder");
const events = require("events");

const GoogleOAuth = require("gpsoauthnode");

var EventEmitter = events.EventEmitter;

var api_url = 'https://pgorelease.nianticlabs.com/plfe/rpc';
var login_url = 'https://sso.pokemon.com/sso/login?service=https%3A%2F%2Fsso.pokemon.com%2Fsso%2Foauth2.0%2FcallbackAuthorize';
var login_oauth = 'https://sso.pokemon.com/sso/oauth2.0/accessToken';

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

    public async init(username, password, location, provider, callback)
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
        self.SetLocation(location, function (err, loc)
        {
            if (err)
                throw err;

            // Getting access token
            this.playerInfo.accessToken = this.getAccessToken(username, password);

            // Getting api endpoint
            this.getApiEndpoint(function (err, api_endpoint)
            {
                if (err)
                    throw err;

                callback(null)
            });
        });
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


    public async getApiEndpoint()
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

        var f_ret = await this.makeApiRequest(api_url, this.playerInfo.accessToken, req) as any;

        var endpoint = `https://${f_ret.api_url}/rpc`;

        this.playerInfo.apiEndpoint = endpoint;
        Logger.info("Received API Endpoint: " + endpoint);

        return endpoint;
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
            }
            catch (e)
            {
                if (e.decoded)
                {
                    Logger.warn(e);
                    response = e.decoded; // Decoded message with missing required fields
                }
            }

            def.resolve(response);
        });

        return def.promise;
    }
}


function Pokeio()
{
    var self = this;
    self.events = new EventEmitter();
    self.j = request.jar();
    self.request = request.defaults({jar: self.j});

    self.google = new GoogleOAuth();

    self.GetProfile = function (callback)
    {
        var req = new RequestEnvelop.Requests(2);
        api_req(self.playerInfo.apiEndpoint, self.playerInfo.accessToken, req, function (err, f_ret)
        {
            if (err)
            {
                return callback(err);
            }

            if (f_ret.payload[0].profile)
            {
                self.DebugPrint('[i] Logged in!');
            }
            callback(null, f_ret.payload[0].profile);
        });
    };

    self.GetLocation = function (callback)
    {
        geocoder.reverseGeocode(self.playerInfo.latitude, self.playerInfo.longitude, function (err, data)
        {
            console.log('[i] lat/long/alt: ' + self.playerInfo.latitude + ' ' + self.playerInfo.longitude + ' ' + self.playerInfo.altitude);
            if (data.status == 'ZERO_RESULTS')
            {
                return callback(new Error('location not found'));
            }

            callback(null, data.results[0].formatted_address);
        });
    };

    self.GetLocationCoords = function ()
    {
        var coords = {
            latitude: self.playerInfo.latitude,
            longitude: self.playerInfo.longitude,
            altitude: self.playerInfo.altitude,
        };

        return coords;
    };

    self.SetLocation = function (location, callback)
    {
        if (location.type != "name" && location.type != "coords")
        {
            throw new Error('Invalid location type');
        }

        if (location.type == "name")
        {
            if (!location.name)
            {
                throw new Error('You should add a location name');
            }
            var locationName = location.name;
            geocoder.geocode(locationName, function (err, data)
            {
                if (err || data.status == 'ZERO_RESULTS')
                {
                    return callback(new Error('location not found'));
                }

                self.playerInfo.latitude = data.results[0].geometry.location.lat;
                self.playerInfo.longitude = data.results[0].geometry.location.lng;
                self.playerInfo.locationName = locationName;

                var coords = {
                    latitude: self.playerInfo.latitude,
                    longitude: self.playerInfo.longitude,
                    altitude: self.playerInfo.altitude,
                };

                callback(null, coords);
            });
        }
        else if (location.type == "coords")
        {
            if (!location.coords)
            {
                throw new Error('Coords object missing');
            }

            self.playerInfo.latitude = coords.latitude ? coords.latitude : self.playerInfo.latitude;
            self.playerInfo.longitude = coords.longitude ? coords.longitude : self.playerInfo.longitude;
            self.playerInfo.altitude = coords.altitude ? coords.altitude : self.playerInfo.altitude;

            var coords = {
                latitude: self.playerInfo.latitude,
                longitude: self.playerInfo.longitude,
                altitude: self.playerInfo.altitude,
            };

            geocoder.reverseGeocode(self.playerInfo.latitude, self.playerInfo.longitude, function (err, data)
            {
                if (data.status != 'ZERO_RESULTS')
                {
                    self.playerInfo.locationName = data.results[0].formatted_address;
                }
                callback(null, coords);
            });
        }
    };
}

module.exports = new Pokeio();
module.exports.Pokeio = Pokeio;
