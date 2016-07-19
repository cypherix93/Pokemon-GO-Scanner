import {Location} from "./Location";

export class Player
{
    public debug:boolean;

    public location:Location;

    public provider:string;

    public accessToken:string;
    public apiEndpoint:string;

    constructor()
    {
        this.location = new Location();
    }
}