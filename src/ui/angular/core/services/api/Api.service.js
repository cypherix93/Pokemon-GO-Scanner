AngularApp.service("ApiService", function ApiService($http)
{
    var self = this;
    
    var baseUrl = "http://localhost:32598";
    
    var bindMethods = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];
            
            self[arg] = (function(method)
            {
                return function (apiUrl, config)
                {
                    apiUrl = formatApiUrl(apiUrl);
                    
                    return $http[method](baseUrl + apiUrl, config);
                }
            })(arg);
        }
    };
    
    var bindMethodsWithData = function ()
    {
        for (var i = 0; i < arguments.length; i++)
        {
            var arg = arguments[i];
            
            self[arg] = (function(method)
            {
                return function (apiUrl, data, config)
                {
                    apiUrl = formatApiUrl(apiUrl);
                    
                    return $http[method](baseUrl + apiUrl, data, config);
                }
            })(arg);
        }
    };
    
    var formatApiUrl = function(url)
    {
        return url[0] === "/" ? url : "/" + url;
    };
    
    bindMethods("get", "delete", "head", "jsonp");
    bindMethodsWithData("post", "put", "patch");
});