// Configure Angular App Preferences
AngularApp.config(function (toastrConfig)
{
    toastrConfig.autoDismiss = true;
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.preventOpenDuplicates = true;
});

AngularApp.config(function (uiGmapGoogleMapApiProvider)
{
    uiGmapGoogleMapApiProvider.configure({
        key: process.env.GOOGLE_MAPS_API_KEY
    });
});