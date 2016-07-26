AngularApp.controller("LocationSearchController", function LocationSearchController($scope, LocationHelperService)
{
    var self = this;
        
    self.searchLocation = function()
    {
        if(!self.searchInput)
            return;
        
        LocationHelperService.reverseGeocode(self.searchInput)
            .then(function(coords)
            {
                self.coords = coords;
            });
    };
});