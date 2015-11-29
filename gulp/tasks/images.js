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
// images
gulp.task('images', function(){
    return merge(
        gulp.src([
            paths.img.src + '/**',
            '!' + paths.img.src + '/ico',
            '!' + paths.img.src + '/ico/**/*'
        ]),
        gulp.src(paths.sprites.src + '/img/*.svg')
    )
        .pipe(gulp.dest(paths.img.dest));
});
