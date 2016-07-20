export class Message
{
    public channel:string;
    public listener:(request:any) => any;

    constructor(channel:string, listener?:(request:any) => any)
    {
        this.channel = channel;
        this.listener = listener;
    }
}