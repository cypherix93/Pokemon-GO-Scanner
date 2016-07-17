import request = require("request");

export class ApiHandler
{
    public static get request()
    {
        var jar = request.jar();
        return request.defaults({jar});
    }
}