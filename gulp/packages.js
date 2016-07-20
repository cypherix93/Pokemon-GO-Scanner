"use strict";

const merge = require("merge-stream");
const runSequence = require("run-sequence");
const bower = require("bower");
const mainBowerFiles = require("main-bower-files");

// Global Package Info
const meta = require("../meta.json");

module.exports = function(gulp, plugins, paths)
{
    // Install all packages
    gulp.task("install-packages", function (callback)
    {
        runSequence(
            "update-package-info",
            "bower-install",
            callback
        );
    });
    
    // Update Assembly Info
    gulp.task("update-package-info", function ()
    {
        // Update bower.json Info
        var bowerJson = gulp.src("./bower.json")
            .pipe(plugins.debug({title: "bower.json:"}))
            .pipe(plugins.jsonEditor({
                name: meta.name,
                version: meta.version
            }))
            .pipe(gulp.dest("."));
        
        // Update package.json Info
        var packageJson = gulp.src("./package.json")
            .pipe(plugins.debug({title: "package.json:"}))
            .pipe(plugins.jsonEditor({
                name: meta.name,
                version: meta.version,
                description: meta.description,
                copyright: meta.copyright,
                author: meta.author
            }))
            .pipe(gulp.dest("."));
        
        return merge(bowerJson, packageJson);
    });
        
    // Restore NPM and Bower packages
    gulp.task("bower-restore", function (callback)
    {
        bower.commands.install([], {save: true}, {})
            .on("end", function (installed)
            {
                callback(); // notify gulp that this task is finished
            });
    });
    
    // Install Bower Packages
    gulp.task("bower-install", ["bower-restore"], function ()
    {
        var libDir = paths.assets + "lib/";
        
        var jsFilter = plugins.filter(["**/*.js", "!**/*.min.js"], {restore: true});
        var cssFilter = plugins.filter(["**/*.css", "!**/*.min.css"], {restore: true});
        var fontFilter = plugins.filter(["**/*.eot", "**/*.woff", "**/*.woff2", "**/*.svg", "**/*.ttf"], {restore: true});
        var imageFilter = plugins.filter(["**/*.jpg", "**/*.png", "**/*.gif"], {restore: true});
        
        var generatePath = function (path)
        {
            var extractMainName = function (name)
            {
                var index = name.search(/[-.\\/]/);
                return index > 0 ? name.substring(0, index) : name;
            };
            
            var extDir = path.extname.substring(1);
            switch (extDir)
            {
                case "eot":
                case "woff":
                case "woff2":
                case "svg":
                case "ttf":
                    extDir = "fonts";
                    break;
                case "jpg":
                case "png":
                case "gif":
                    extDir = "images";
                    break;
            }
            path.dirname = "/" + extractMainName(path.dirname) + "/" + extDir;
        };
        
        // The main bower dependencies with only JS and CSS and fonts
        var mainBower = gulp.src(mainBowerFiles(), {base: "./bower_components"})
        // Install and Minify JS Files
            .pipe(jsFilter)
            .pipe(plugins.debug({title: "js:"}))
            .pipe(plugins.rename(generatePath))
            .pipe(gulp.dest(libDir))
            .pipe(plugins.uglify())
            .pipe(plugins.rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(libDir))
            .pipe(jsFilter.restore)
            
            // Install and Minify CSS Files
            .pipe(cssFilter)
            .pipe(plugins.debug({title: "css:"}))
            .pipe(plugins.rename(generatePath))
            .pipe(gulp.dest(libDir))
            .pipe(plugins.cleanCss())
            .pipe(plugins.rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(libDir))
            .pipe(cssFilter.restore)
            
            // Install Font Files
            .pipe(fontFilter)
            .pipe(plugins.debug({title: "fonts:"}))
            .pipe(plugins.rename(generatePath))
            .pipe(gulp.dest(libDir))
            .pipe(fontFilter.restore)
            
            // Install Image Files
            .pipe(imageFilter)
            .pipe(plugins.debug({title: "images:"}))
            .pipe(plugins.rename(generatePath))
            .pipe(gulp.dest(libDir))
            .pipe(imageFilter.restore);
        
        // Bootstrap SASS files
        var bootstrapSass = gulp.src("./bower_components/bootstrap-sass-official/assets/stylesheets/**/*.scss")
            .pipe(gulp.dest(paths.sass + "bootstrap/"));
        
        // Return merged stream
        return merge(mainBower, bootstrapSass);
    });
};
