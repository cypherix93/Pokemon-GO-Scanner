import {MapObjectType} from "./MapObjectType";

export abstract class MapObject
{
    public id:string;

    public coords:{
        latitude:number,
        longitude:number
    };

    public type:string;

    constructor(latitude:number, longitude:number, type:MapObjectType)
    {
        this.coords = {latitude, longitude};

        this.type = MapObjectType[type];
    }

    protected generateMapId(prefix?:string):string
    {
        var stringToEncode = `${prefix || ""}LAT${this.coords.latitude}|LONG${this.coords.longitude}`;

        return new Buffer(stringToEncode).toString("base64");
    }
}