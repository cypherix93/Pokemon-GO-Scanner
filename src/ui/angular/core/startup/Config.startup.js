// Configure Angular App Preferences
AngularApp.config(function (toastrConfig)
{
    toastrConfig.autoDismiss = true;
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.preventOpenDuplicates = true;
});
AngularApp.config(function ($logProvider)
{
    $logProvider.debugEnabled(false);
});
/*

(function()
{
    var googleMapProvider;
    
    AngularApp.config(function (uiGmapGoogleMapApiProvider)
    {
        googleMapProvider = uiGmapGoogleMapApiProvider;
    });
    
    AngularApp.run(function(ApiService)
    {
        ApiService.get("/config/getGoogleMapsApiKey")
            .success(function(response)
            {
                googleMapProvider.configure({
                    key: response.data
                });
            });
    });
})();
*/
