import {MapObject} from "./MapObject";
import {MapObjectType} from "./MapObjectType";

export class MapPokestop extends MapObject
{
    public lured:boolean;
    public lureExpirationTime:number;

    constructor(latitude:number, longitude:number)
    {
        super(latitude, longitude, MapObjectType.pokestop);

        this.generateMapId();
    }

    public setLure(expirationTime:number)
    {
        this.lured = true;
        this.lureExpirationTime = expirationTime;
    }

    protected generateMapId():string
    {
        return super.generateMapId(`PKSTP|`);
    }
}
