/// <reference path="D:\Космос\FileBrowsing\FileBrowsing_Web\App/Index.html" />
/// <reference path="D:\Космос\FileBrowsing\FileBrowsing_Web\App/Index.html" />
module.exports = function (grunt) {
    // load Grunt plugins from NPM
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // configure plugins
    grunt.initConfig({
        concat: {
            dist: {
                src: ['App/App.js', 'App/controllers/*.js', 'App/services/*.js'],
                dest: 'build/bundle.js'
            },
            options: {
                sourceMap: true
            }
        //},

        //watch: {
        //    scripts: {
        //        files: ['Scripts/**/*.js'],
        //        tasks: ['uglify']
        //    }
        }
    });

    // define tasks
    grunt.registerTask('default', ['concat']);
};