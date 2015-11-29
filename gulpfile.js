var gulp = require('gulp');
var path = require('path');

// resolve further ../../ issues
global.__base = __dirname + '/';

// paths helper
global.__dist = __dirname + '/public';

// auto-load gulp-* plugins
var $ = require('gulp-load-plugins')();

// require gulp tasks
var requireDir = require('require-dir');

// other modules
var del = require('del');
var merge = require('merge2');
var runSequence = require('run-sequence');

// config
var config = require('./config.json');
var paths = config.paths;

// production mode
var production = $.util.env.p || $.util.env.prod;

// Require all tasks.
requireDir( './gulp/tasks', {recurse: true});


// -----------------------------------------------------------------------------------------------------------------


//
// STYLEGUIDES

gulp.task('styleguide', function(cb){
    return runSequence(
        'styles',
        'styleguide:generate',
        'styleguide:styles',
        cb
    );
});

gulp.task('styleguide-dev', ['styleguide'], function(){
    gulp.watch('./' + paths.css.src + '/**/*.scss', ['styleguide']);
});


//
// BUILD

gulp.task('build', ['clean'], function(){
    return runSequence(
        'html',
        'sprites',
        'styles',
        'images',
        'webpack',
        'favicon'
    );
});


//
// DEV

gulp.task('default', ['build'], function(){
    runSequence(
        'sync',
        function(){
            gulp.watch('./src/*.html', ['html']);
            gulp.watch('./' + paths.js.src + '/**/*', ['webpack']);
            gulp.watch('./' + paths.css.src + '/**/*.scss', ['styles']);
        });
});
