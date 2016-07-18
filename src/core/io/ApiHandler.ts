import request = require("request");

export class ApiHandler
{
    private static _request;

    public static get request()
    {
        if (ApiHandler._request)
            return ApiHandler._request;

        var jar = request.jar();
        ApiHandler._request = request.defaults({jar});

        return ApiHandler._request;
    }
}