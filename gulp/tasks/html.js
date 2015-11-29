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


//
// html
gulp.task('html', function(){
    return gulp.src('src/index.html')
        .pipe($.minifyHtml({
            conditionals: true
        }))
        .pipe(gulp.dest(__dist));
});
