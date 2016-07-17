export class Application
{
    public static args:any;
    
    public static get config()
    {
        return {
            location: {
                type: "name",
                name: this.args.location
            },
            username: this.args.username,
            password: this.args.password,
            provider: this.args.provider,
        }
    }
    
    public static init()
    {
        
    }
}