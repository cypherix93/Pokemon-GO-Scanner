AngularApp.config(function ($stateProvider)
{
    $stateProvider.state("home",
        {
            url: "/",
            templateUrl: "views/home/index.html",
            onEnter: function($rootScope)
            {
                $rootScope.PageName = "Home"
            }
        });
});