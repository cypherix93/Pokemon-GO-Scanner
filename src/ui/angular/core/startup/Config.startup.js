// Configure Angular App Preferences
AngularApp.config(function (toastrConfig)
{
    toastrConfig.autoDismiss = true;
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.preventOpenDuplicates = true;
});

(function()
{
    var googleMapProvider;
    
    AngularApp.config(function (uiGmapGoogleMapApiProvider)
    {
        googleMapProvider = uiGmapGoogleMapApiProvider;
    });
    
    AngularApp.run(function($http)
    {
        $http.get("http://localhost:32598/config/getGoogleMapsApiKey")
            .success(function(response)
            {
                googleMapProvider.configure({
                    key: response.data
                });
            })
    });
})();