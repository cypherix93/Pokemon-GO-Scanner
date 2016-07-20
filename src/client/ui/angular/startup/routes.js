"use strict";

angular.module("AngularApp")
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
    });