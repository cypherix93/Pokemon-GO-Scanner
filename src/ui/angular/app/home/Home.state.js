AngularApp.config(function ($stateProvider)
{
    $stateProvider.state("home",
        {
            url: "/",
            template: "<home-component></home-component>",
            onEnter: function($rootScope)
            {
                $rootScope.PageName = "Home"
            }
        });
});