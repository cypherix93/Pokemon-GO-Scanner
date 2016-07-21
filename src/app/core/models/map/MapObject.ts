export abstract class MapObject
{
    public latitude:number;

    public longitude:number;

    constructor(latitude:number, longitude:number)
    {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}