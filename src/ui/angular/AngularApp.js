// Global Angular App Declaration
var AngularApp = angular.module("AngularApp",
    [
        "ngSanitize",
        "ngAnimate",
        "ngMessages",
        "ui.router",
        "ui.bootstrap",
        "toastr",
        "uiGmapgoogle-maps"
    ]);

var apprequire = function(pathFromApp)
{
    const path = require("path");
    
    return require(path.join("../app/", pathFromApp));
};