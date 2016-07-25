AngularApp.directive("pokemonType", function ()
{
    return {
        restrict: "A",
        scope: {
            pokemonType: "@"
        },
        templateUrl: "templates/core/directives/pokemon-type/PokemonType.template.html",
        link: function (scope, element, attrs)
        {
            scope.$watch("pokemonType", function (newVal)
            {
                if (!newVal)
                    return;
                
                scope.types = scope.pokemonType
                    .split("/")
                    .map(function (type)
                    {
                        return type.trim();
                    });
            });
        }
    }
});