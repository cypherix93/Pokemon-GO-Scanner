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
    }

    protected abstract generateMapId():string;
}