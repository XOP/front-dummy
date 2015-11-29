var gulp = require('gulp');
var path = require('path');

// auto-load gulp-* plugins
var $ = require('gulp-load-plugins')();

var merge = require('merge2');
var runSequence = require('run-sequence');

// config
var config = require(__base + 'config.json');
var paths = config.paths;

// production mode
var production = $.util.env.p || $.util.env.prod;


var browserSync = require('browser-sync');
var reload = browserSync.reload;


//
// browser sync
gulp.task('sync', function(){
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        files: ["public/**/*.*"],
        port: config.port
//        , logLevel: "debug"
    });
});


//
// run server
gulp.task('run', function(){
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        files: ["public/**/*.*"],
        port: $.util.env.port || config.port + 1000
    });
});
