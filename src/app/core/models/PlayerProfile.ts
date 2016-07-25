export class PlayerProfile
{
    public username:string;
    public team:string;

    public tutorial:any;

    public avatar:any;

    public storage:{
        pokemon:number,
        items: number
    };

    public pokecoins:number;
    public stardust:number;

    public dailyBonus:{
        nextCollectTimestamp:number,
        nextDefenderBonusCollectTimestamp:number
    };

    constructor()
    {
        this.storage = {} as any;
        this.dailyBonus = {} as any;
    }
}