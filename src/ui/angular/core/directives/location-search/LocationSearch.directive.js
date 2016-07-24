AngularApp.directive("locationSearch", function (LocationHelperService)
{
    return {
        restrict: "EA",
        scope: {
            coords: "<"
        },
        templateUrl: "templates/core/directives/location-search/LocationSearch.template.html",
        link: function (scope, element, attrs)
        {
            scope.searchLocation = function()
            {
                if(!scope.searchInput)
                    return;
                
                LocationHelperService.reverseGeocode(scope.searchInput)
                    .then(function(coords)
                    {
                        scope.coords = coords;
                    });
            };
        }
    }
});