// Global Angular App Declaration
var AngularApp = angular.module("AngularApp",
    [
        "ngSanitize",
        "ngAnimate",
        "ngMessages",
        "ui.router",
        "ui.bootstrap",
        "toastr"
    ]);
// Configure Angular App Preferences
AngularApp.config(["toastrConfig", function (toastrConfig)
{
    toastrConfig.autoDismiss = true;
    toastrConfig.positionClass = "toast-bottom-center";
    toastrConfig.preventOpenDuplicates = true;
}]);
// Configure Angular App Routes
AngularApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function ($stateProvider, $urlRouterProvider, $locationProvider)
{
    $locationProvider.html5Mode(false);
}]);
// Configure Angular App Initialization
AngularApp.run(["$rootScope", "$state", function ($rootScope, $state)
{
    $state.go("home");
}]);
AngularApp.service("IPCService", function IPCService()
{
    const self = this;
    
    const IpcClient = require("electron-ipc-tunnel/client").default;
    
    const client = new IpcClient();
    
    self.send = function (channel, request)
    {
        return client.send(channel, request);
    }
});
AngularApp.service("AuthService", ["$q", "$window", function ($q, $window)
{
    const self = this;

}]);
AngularApp.service("IdentityService", function ()
{
    const self = this;

    // Current User Identity
    self.currentUser = undefined;

    // Function to check if the current user is authenticated
    self.isAuthenticated = function ()
    {
        return !!self.currentUser;
    };
});
AngularApp.service("ModalService", ["$q", "$http", "$compile", "$rootScope", function ($q, $http, $compile, $rootScope)
{
    var exports = this;

    var ModalInstance = function (element, options)
    {
        var _instance = this;

        // Fields
        _instance.element = element;
        _instance.state = "default";

        _instance.onOpen = options.onOpen;
        _instance.onClose = options.onClose;

        // Init the modal
        _instance.element.modal({
            show: false
        });

        // Width fix
        _instance.element.width(options.width);

        // Event Handlers
        _instance.element.on("show", function ()
        {
            // Margin fix
            _instance.element.css("margin-left", -(_instance.element.width() / 2));

            if (_instance.onOpen)
                _instance.onOpen();
        });
        _instance.element.on("hidden", function ()
        {
            if (_instance.onClose)
                _instance.onClose();
        });

        // Open and Close functions
        _instance.open = function ()
        {
            _instance.element.modal("show");
        };
        _instance.close = function ()
        {
            _instance.element.modal("hide");
        };
    };

    // Create modal from Template URL
    exports.createModal = function (templateUrl, options)
    {
        var def = $q.defer();

        // Get the template markup from the URL provided
        $http.get(templateUrl)
            .success(function (response)
            {
                var element = angular.element(response);

                var scope = $rootScope.$new(true);
                $compile(element)(scope);

                angular.element("#content-container").append(element);

                var modalInstance = new ModalInstance(element, options || {width: 600});

                def.resolve(modalInstance);
            });

        return def.promise;
    };

    // Store for all the global modals
    exports.modals = {};

    exports.waitUntilReady = function (modalName)
    {
        var def = $q.defer();

        var watch = $rootScope.$watch(function()
        {
            return !!exports.modals[modalName];
        }, function()
        {
            def.resolve(exports.modals[modalName]);
            watch();
        });

        return def.promise;
    };

    // Global modals init function
    exports.initGlobalModals = function ()
    {
    };
}]);
AngularApp.component("homeComponent", {
    controller: "HomeController as Login",
    templateUrl: "templates/app/home/Home.template.html"
});
AngularApp.controller("HomeController", function HomeController()
{
    const self = this;
    
});
AngularApp.config(["$stateProvider", function ($stateProvider)
{
    $stateProvider.state("home",
        {
            url: "/",
            templateUrl: "views/home/index.html",
            onEnter: ["$rootScope", function($rootScope)
            {
                $rootScope.PageName = "Home"
            }]
        });
}]);
angular.module("AngularApp").run(["$templateCache", function($templateCache) {$templateCache.put('templates/app/home/Home.template.html','<div class="clearfix">\r\n    <h2 class="page-header">Log In</h2>\r\n\r\n    <form class="form-horizontal clearfix col-xs-10 col-xs-offset-1" ng-submit="Login.login()" novalidate>\r\n        <div class="form-group">\r\n            <label for="email" class="required">Email</label>\r\n            <input type="email" class="form-control" id="email" ng-model="Login.email" required>\r\n        </div>\r\n        <div class="form-group">\r\n            <label for="password" class="required">Password</label>\r\n            <input type="password" class="form-control" id="password" ng-model="Login.password" required>\r\n        </div>\r\n        <div class="form-group">\r\n            <button type="submit" class="btn btn-block btn-primary">\r\n                <span class="fa fa-sign-in"></span>\r\n                Login\r\n            </button>\r\n        </div>\r\n        <div class="form-group">\r\n            <div class="text-center">\r\n                <h4>\r\n                    <a ui-sref="register">Don\'t have an account? Sign up.</a>\r\n                </h4>\r\n            </div>\r\n            <div class="text-center">\r\n                <a>Forgot Password?</a>\r\n            </div>\r\n        </div>\r\n        <br>\r\n    </form>\r\n</div>');}]);