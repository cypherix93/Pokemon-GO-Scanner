import {MapObject} from "./MapObject";
import {MapObjectType} from "./MapObjectType";

export class MapPokestop extends MapObject
{
    constructor(latitude:number, longitude:number)
    {
        super(latitude, longitude, MapObjectType.pokestop);
    }

    protected generateMapId():string
    {
        return super.generateMapId(`PKSTP|`);
    }
}
