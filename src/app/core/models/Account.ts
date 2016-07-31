export class Account
{
    public username:string;
    public password:string;
    public provider:string;

    constructor(username, password, provider)
    {
        this.username = username;
        this.password = password;
        this.provider = provider;
    }
}
