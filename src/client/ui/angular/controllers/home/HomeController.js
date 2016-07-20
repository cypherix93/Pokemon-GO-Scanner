angular.module("AngularApp")
    .controller("HomeController", function HomeController(GameDataService)
    {
        const self = this;
        
        GameDataService.getGamesForWidgets()
            .then(games =>
            {
                self.games = games;
            });
    });