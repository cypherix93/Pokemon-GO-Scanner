AngularApp.directive("infoPanel", function ()
{
    return {
        restrict: "EA",
        scope: {},
        transclude: true,
        templateUrl: "templates/core/directives/info-panel/InfoPanel.template.html",
        link: {
            pre: function (scope, element, attrs)
            {
                scope.panelShown = true;
                
                scope.togglePanel = function()
                {
                    scope.panelShown = !scope.panelShown;
                };
            },
            post: function (scope, element, attrs)
            {
                
            }
        }
    }
});