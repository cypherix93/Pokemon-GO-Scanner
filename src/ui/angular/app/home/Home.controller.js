AngularApp.controller("HomeController", function HomeController(uiGmapGoogleMapApi)
{
    const self = this;
    
    self.map = {
        center: {
            latitude: 40.925493,
            longitude: -73.123182
        },
        zoom: 16,
        options: {
            disableDefaultUI: true,
            zoomControl: true
        }
    };
});