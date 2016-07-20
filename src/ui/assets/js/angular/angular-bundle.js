"use strict";

angular.module("AngularApp", [
    "ngAnimate",
    "ngSanitize",
    "ngMessages",
    "toastr",
    "ui.bootstrap",
    "ui.router"
]);
"use strict";

angular.module("AngularApp")
    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false);

        // Home page routes
        $stateProvider
            .state("home",
            {
                url: "/",
                templateUrl: "views/home/index.html"
            });

        $stateProvider
            .state("test",
            {
                url: "/test",
                templateUrl: "views/test/index.html"
            });

        $stateProvider
            .state("gameInfo",
                {
                    url: "/gameInfo/:appId",
                    templateUrl: "views/gameInfo/gameInfo.html"
                });
    }]);
angular.module("AngularApp")
    .run(["$state", function($state)
    {
        $state.go("home");
    }]);
angular.module("AngularApp")
    .service("IPCService", function IPCService()
    {
        const self = this;
    
        const IpcClient = require("electron-ipc-tunnel/client").default;
    
        const client = new IpcClient();

        self.send = function(channel, request)
        {
            return client.send(channel, request);
        }
    });
angular.module("AngularApp")
    .service("GameDataService", ["$q", "IPCService", function GameDataService($q, IPCService)
    {
        const self = this;

        // Get games
        self.getGamesForWidgets = function()
        {
            var def = $q.defer();

            IPCService.send("game/getGamesForWidgets")
                .then(response =>
                {
                    def.resolve(response);
                });

            return def.promise;
        };

        self.getGameById = function(appId)
        {
            var def = $q.defer();

            IPCService.send("game/getById", {id: appId})
                .then(response =>
                {
                    def.resolve(response);
                });

            return def.promise;
        };
    }]);
angular.module("AngularApp")
    .directive("gameInfoWidget", function()
    {
        return {
            restrict: "EA",
            scope: {
                game: "="
            },
            templateUrl: "templates/home/game-info-widget-template.html"
        }
    });
angular.module("AngularApp")
    .directive("posNegBar", function()
    {
        return {
            restrict: "EA",
            scope: {
                pos: "=",
                neg: "="
            },
            link: function(scope, element, attrs)
            {
                if (scope.pos < 1)
                    scope.pos = scope.pos * 100 | 0;

                if (scope.neg < 1)
                    scope.neg = scope.neg * 100 | 0;
            },
            templateUrl: "templates/shared/pos-neg-bar-template.html"
        }
    });
angular.module("AngularApp")
    .controller("GameInfoController", ["GameDataService", "$stateParams", function GameInfoController(GameDataService, $stateParams)
    {
        const self = this;

        GameDataService.getGameById($stateParams.appId)
            .then(game =>
            {
                self.game = game;
            });

        self.badFeatures = ["Poop", "Makes", "the", "World", "Poopier"];
        self.goodFeatures = ["#Naranja", "#Nuhlupah", "#Fedora", "#SameJeans", "#Community"];
        self.topReviews = ["Such a disapointmet... Flatout 1/2/UC are one of my favourite racing games, but this game is just terrible. Graphics are worse than in Flatout 2, but it lags as hell, even though my pc runs Crysis 2 on high settings without any problem. Music is worse, physics and camera are much worse, interface feels very uncomfortable. The only good thing about it is that it doesn't have GFWL support, when the UC did. Overall it is a really, really bad game. It wouldn't be such a big deal for me, if it wasn't a sequel to flatout games, but, unfortunately, it is and it makes it the worst game i have played in a last few years.",
            "Read the forum first ! If you've played the other flatout games first and think this is the same bewarned  it's not. It's a really poor attempt to cash in on the previous game's success. Also for some reason my gamepad suffers from dreadful input lag. Can i be bothered to search for a cure... no, not really. I will write the cash of as a bad investment and make a mental note to read the forum first before buying anymore of steam special offers.\nSteam you should really look at what your offering people! \nCheap does not always = bargain. :(",
            "This game does not deserve to be named FlatOut.\n\nIt was NOT made by BugBear. \nI'm not being an arrogant ♥♥♥ when I say that it looks more like it was made by your 10yo brother as his first attempt at making a game.\n\nFlatOut 2 is the one you want. FO Ultimate  Carnage is an upgraded version of FO2 with both benefits and downsides.\nI'll go and say I like FO2 better because the Bullet GT was ... well ... nerfed, I guess... Too bad, they could have buffed the other cars instead =/",
            "this  game is a complete ripoff, I want my money back, I want the time I wasted downloading back.\nI want someone at steam to feel the pain I feel for being ripped of by them It's like a kick in the nuts.\nluckily it was the summer sale and they only ripped me off for half the price of this garbage.\nI believe I may have made my last steam purchase.",
            "If you were a fan of the origional Flatout Series, this Isn't the game you're looking for. This game has an arcade type of feel versues the origional Flatout's more realistic feel, and quite frankly I hate it."];
        self.positive = 69;
        self.negative = 31;
        self.reviewsCount = 666;
    }]);
angular.module("AngularApp")
    .controller("HomeController", ["GameDataService", function HomeController(GameDataService)
    {
        const self = this;
        
        GameDataService.getGamesForWidgets()
            .then(games =>
            {
                self.games = games;
            });
    }]);
angular.module("AngularApp")
    .controller("TestController", ["IPCService", function (IPCService)
    {
        const self = this;

        self.phrases = [];

        self.sequence = null;

        self.analyze = function ()
        {
            if(!self.sequence)
                return;

            IPCService.send("analyzer/analyzeSequence", { sequence: self.sequence})
                .then((response) =>
                {
                    console.log("App returned: " + response);
                });

            console.log("Async Asserted");
        }
    }]);
angular.module("AngularApp").run(["$templateCache", function($templateCache) {$templateCache.put("templates/home/game-info-widget-template.html","<div class=\"panel panel-default\" ui-sref=\"gameInfo({appId: game.appId })\">\r\n    <div class=\"panel-body row\">\r\n        <div class=\"col-xs-3\">\r\n            <img src=\"\" alt=\"Some Image\" class=\"img-thumbnail img-responsive\">\r\n        </div>\r\n        <div class=\"col-xs-9\">\r\n            <h4>\r\n                {{game.title}}\r\n            </h4>\r\n            <pos-neg-bar pos=\"game.positiveReviewsPercentage\" neg=\"game.negativeReviewsPercentage\"></pos-neg-bar>\r\n            <hr>\r\n\r\n            <div class=\"pull-left\">\r\n                App ID: {{game.appId}}\r\n            </div>\r\n            <div class=\"pull-right\">\r\n                {{game.reviewsCount | number:0}} reviews\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("templates/shared/pos-neg-bar-template.html","<uib-progress>\r\n    <uib-bar value=\"pos\" type=\"success\">\r\n        <span>Positive: {{pos}}</span>\r\n    </uib-bar>\r\n    <uib-bar value=\"neg\" type=\"danger\">\r\n        <span>Negative: {{neg}}</span>\r\n    </uib-bar>\r\n</uib-progress>");}]);