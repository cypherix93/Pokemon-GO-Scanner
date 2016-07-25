"use strict";

const del = require("del");
var merge = require("merge-stream");
var runSequence = require("run-sequence");

module.exports = function(gulp, plugins, paths)
{
    gulp.task("clean", function (callback)
    {
        return del(paths.build + "/**", {force: true}, callback);
    });
    
    // Build App
    gulp.task("build", function (callback)
    {
        runSequence(
            "compile",
            callback
        );
    });
    
    // Deploy App
    gulp.task("deploy", ["build"], function ()
    {
        var server = gulp.src(paths.build + "server/**")
            .pipe(plugins.zip("server.zip", {compress: true}))
            .pipe(gulp.dest(paths.deploy));
        
        var client = gulp.src(paths.build + "client-web/**")
            .pipe(plugins.zip("client.zip", {compress: true}))
            .pipe(gulp.dest(paths.deploy));
        
        merge(server, client);
    });
};
