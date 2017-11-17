module.exports = function foo(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            options: {
                livereload: true
            },
            styles: {
                files: ["styles/**/*.css"]
            },
            html: {
                files: ["index.html"]
            },
            scripts: {
                files: ["**/scripts/*.js", "**/scripts/**/*.js", "!node_modules/**/*.js" ],
                tasks: ["eslint", "browserify"],
                options: {
                    spawn: false,
                },
            },
        },
        browserify: {
            dist: {
                files: {
                    "build/bundle.js": ["scripts/main.js"],
                },
            },
            options: {
                browserifyOptions: {
                    debug: true,
                }
            }
        },
        eslint: {
            src: [
                "**/scripts/*.js",
                "**/scripts/**/*.js",
                "!node_modules/**/*.js",
            ],
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("gruntify-eslint");
    grunt.loadNpmTasks("grunt-browserify");

    // Default task(s).
    grunt.registerTask("default", ["eslint", "browserify", "watch"]);
};
