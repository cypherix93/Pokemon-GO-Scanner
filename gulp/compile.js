"use strict";

const typescript = require("typescript");
const runSequence = require("run-sequence");
const streamqueue = require("streamqueue");

module.exports = function(gulp, plugins, paths)
{
    // Compile everything
    gulp.task("compile", ["compile-app", "compile-ui"]);
    
    // Compile App files
    gulp.task("compile-app", function ()
    {
        var tsFilter = plugins.filter("**/*.ts", {restore: true});
        
        return gulp.src(paths.app + "**")
            .pipe(tsFilter)
            .pipe(plugins.typescript({
                typescript: typescript,
                target: "ES6",
                module: "commonjs",
                experimentalDecorators: true,
                removeComments: true
            }))
            .pipe(plugins.debug({title: "[app] compiled:"}))
            .pipe(tsFilter.restore)
            .pipe(gulp.dest(paths.build + "app/"));
    });
        
    // Compile Client files
    gulp.task("compile-ui", function (callback)
    {
        runSequence(
            ["bundle-ng-files", "preprocess-sass"],
            "copy-ui-files",
            callback
        );
    });
    
    // Compile Client files
    gulp.task("copy-ui-files", function ()
    {
        var filesToCopy = [
            paths.ui + "assets/**",
            paths.ui + "views/**",
            paths.ui + "index.html"
        ];
        
        return gulp.src(filesToCopy, {base: paths.ui})
            .pipe(plugins.debug({title: "[ui] copied:"}))
            .pipe(gulp.dest(paths.build + "ui/"));
    });
    
    // Bundle AngularJS files
    gulp.task("bundle-ng-files", function ()
    {
        var angularScripts = [
            paths.angular + "AngularApp.js",
            paths.angular + "core/startup/**/*.js",
            paths.angular + "core/services/**/*.js",
            paths.angular + "core/filters/**/*.js",
            paths.angular + "core/directives/**/*.js",
            paths.angular + "app/**/*.js"
        ];
        
        var angularTemplates = paths.angular + "**/*.html";
        
        var angularDest = paths.assets + "js/angular/";
        
        var scripts = gulp.src(angularScripts)
            .pipe(plugins.debug({title: "angular app:"}))
            .pipe(plugins.plumber())
            .pipe(plugins.concat("angular-scripts.js"))
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.plumber.stop());
        
        var templates = gulp.src(angularTemplates)
            .pipe(plugins.debug({title: "angular templates:"}))
            .pipe(plugins.htmlmin())
            .pipe(plugins.angularTemplatecache("angular-templates.js",
                {
                    module: "AngularApp",
                    root: "templates/",
                    templateHeader: "angular.module(\"<%= module %>\").run([\"$templateCache\", function($templateCache) {"
                }));
        
        var bundle = new streamqueue({objectMode: true})
            .queue(scripts)
            .queue(templates)
            .done()
            .pipe(plugins.concat("angular-bundle.js"))
            .pipe(gulp.dest(angularDest));
        
        return bundle;
    });
    
    // Compile SASS files
    gulp.task("preprocess-sass", function ()
    {
        var cssDir = paths.assets + "css/";
        
        return gulp.src(paths.sass + "main.scss")
            .pipe(plugins.debug({title: "compiling sass:"}))
            .pipe(plugins.plumber())
            .pipe(plugins.sassGlob())
            .pipe(plugins.sass())
            .pipe(plugins.plumber.stop())
            .pipe(gulp.dest(cssDir));
    });
};
