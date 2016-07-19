import q = require("q");

import {Location} from "../models/Location";

const geocoder = require("geocoder");

export class GeocoderHelper
{
    public static async resolveLocationByName(locationName:string):Promise<Location>
    {
        var def = q.defer();

        geocoder.geocode(locationName, (err, data) =>
        {
            if (err || data.status === "ZERO_RESULTS")
            {
                throw new Error("Location not found");
            }

            var location = new Location();
            location.latitude = data.results[0].geometry.location.lat;
            location.longitude = data.results[0].geometry.location.lng;
            location.locationName = locationName;

            def.resolve(location);
        });

        return await def.promise;
    };

    public static async resolveLocationByCoordinates(latitude:number, longitude:number):Promise<Location>
    {
        var def = q.defer();

        geocoder.reverseGeocode(latitude, longitude, (err, data) =>
        {
            if (err || data.status === "ZERO_RESULTS")
            {
                throw new Error("Location not found");
            }

            var location = new Location();
            location.latitude = longitude;
            location.longitude = longitude;
            location.locationName = data.results[0].formatted_address;

            def.resolve(location);
        });

        return await def.promise;
    }
}