// Configure Angular App Routes
AngularApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider)
{
    $locationProvider.html5Mode(false);

    // Home page routes
    $stateProvider.state("home",
        {
            url: "/",
            templateUrl: "views/home/index.html"
        });

    // Error routes
    $stateProvider.state("error",
        {
            url: "/error/:status",
            templateUrl: function (urlattr)
            {
                return "views/error/" + urlattr.status + ".html";
            }
        });
});