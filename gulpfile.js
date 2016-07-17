"use strict";

// Gulp
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

// NPM Tools
var del = require("del");
var runSequence = require("run-sequence");
var typescript = require("typescript");

// Directories
var paths = {};

paths.build = "./build/";
paths.deploy = "./deploy/";
paths.project = "./src/";

// Default Task
gulp.task("default", function (callback)
{
    runSequence(
        "clean",
        "compile",
        callback
    );
});

gulp.task("clean", function (callback)
{
    return del(paths.build + "/**", {force: true}, callback);
});

// Compile Server files
gulp.task("compile", function ()
{
    var tsFilter = plugins.filter("**/*.ts", {restore: true});
    
    return gulp.src(paths.project + "**")
        .pipe(tsFilter)
        .pipe(plugins.typescript({
            typescript: typescript,
            target: "ES6",
            module: "commonjs",
            experimentalDecorators: true,
            removeComments: true
        }))
        .pipe(plugins.debug({title: "[server] compiled:"}))
        .pipe(tsFilter.restore)
        .pipe(gulp.dest(paths.build));
});

gulp.task("watch",
    function ()
    {
        plugins.watch(paths.project + "**",
            function ()
            {
                runSequence(
                    "compile"
                );
            });
    });