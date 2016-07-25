"use strict";

const runSequence = require("run-sequence");

module.exports = function(gulp, plugins, paths)
{
    gulp.task("watch",
        function ()
        {
            plugins.watch(paths.app + "**",
                function ()
                {
                    runSequence(
                        "compile-app"
                    );
                });
            
            plugins.watch(paths.ui + "**",
                function ()
                {
                    runSequence(
                        "compile-ui"
                    );
                });
        });
};