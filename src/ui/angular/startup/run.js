angular.module("AngularApp")
    .run(function($state)
    {
        $state.go("home");
    });