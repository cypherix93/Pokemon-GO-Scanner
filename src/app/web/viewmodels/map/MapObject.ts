export abstract class MapObject
{
    public id:string;

    public coords:{
        latitude:number,
        longitude:number
    };

    constructor(latitude:number, longitude:number)
    {
        this.coords = {latitude, longitude};

        this.id = this.generateMapId();
    }

    private generateMapId()
    {
        var stringToEncode = `LAT${this.coords.latitude}|LONG${this.coords.longitude}`;

        return new Buffer(stringToEncode).toString("base64");
    }
}