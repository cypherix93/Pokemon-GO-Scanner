import _ = require("lodash");

import {MapObjectType} from "../enums/MapObjectType";

export abstract class MapObject
{
    public id:string;

    public lat:number;
    public lng:number;

    public type:string;

    constructor(latitude:number, longitude:number, type:MapObjectType)
    {
        this.lat = latitude;
        this.lng = longitude;

        this.type = MapObjectType[type];
    }

    protected generateMapId(prefix?:string):string
    {
        var stringToEncode = `${prefix || ""}LAT${this.lat}|LONG${this.lng}`;

        this.id = new Buffer(stringToEncode).toString("base64");

        return this.id;
    }

    public static getUniqueMapObjects(mapObjects:MapObject[]):MapObject[]
    {
        // Get unique markers
        var sortedMarkers = mapObjects.sort((x, y) =>
        {
            var a = x.id;
            var b = y.id;

            if (a < b)
                return -1;

            if (a > b)
                return 1;

            return 0;
        });

        return _.sortedUniqBy(sortedMarkers, "id");
    }
}