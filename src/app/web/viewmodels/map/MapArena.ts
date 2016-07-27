import {MapObject} from "./MapObject";
import {Team} from "../enums/Team";
import {MapObjectType} from "../enums/MapObjectType";

export class MapArena extends MapObject
{
    public team:string;
    public prestige:number;

    constructor(latitude:number, longitude:number)
    {
        super(latitude, longitude, MapObjectType.arena);

        this.generateMapId();
    }

    public setTeam(team:Team)
    {
        this.team = Team[team];
    }

    protected generateMapId():string
    {
        return super.generateMapId(`PKSTP|`);
    }
}
