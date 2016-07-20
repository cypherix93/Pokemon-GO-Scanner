"use strict";

// Gulp
var gulp = require("gulp");
var plugins = require("gulp-load-plugins")();

var runSequence = require("run-sequence");

// Directories
var paths = {};

paths.build = "./build/";
paths.deploy = "./deploy/";
paths.project = "./src/";

paths.app = paths.project + "app/";
paths.ui = paths.project + "ui/";

paths.assets = paths.ui + "assets/";
paths.sass = paths.ui + "sass/";
paths.angular = paths.ui + "angular/";

// Default Task
gulp.task("default", function (callback)
{
    runSequence(
        "install-packages",
        "deploy",
        callback
    );
});


// Load the tasks from files

// Package Tasks
require("./gulp/packages")(gulp, plugins, paths);

// Compile Tasks
require("./gulp/compile")(gulp, plugins, paths);

// Build Tasks
require("./gulp/build")(gulp, plugins, paths);

// Watch Tasks
require("./gulp/watch")(gulp, plugins, paths);