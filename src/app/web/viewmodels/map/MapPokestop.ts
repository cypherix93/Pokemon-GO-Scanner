import {MapObject} from "./MapObject";

export class MapPokestop extends MapObject
{
    constructor(latitude:number, longitude:number)
    {
        super(latitude, longitude);
    }

    protected generateMapId():string
    {
        return "ABC";
    }
}
