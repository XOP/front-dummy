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


// PostCSS plugins
var scssSyntax = require('postcss-scss');
var precss = require('precss');
var mixin = require('postcss-mixins');
var nano = require('cssnano');
var calc = require('postcss-calc');
var at2x = require('postcss-at2x');
var autoprefixer = require('autoprefixer');
var Browsers = ['last 2 versions'];

// sc5
var styleguide = require('sc5-styleguide');


//
// styleguides
gulp.task('styleguide:generate', function() {

    // we want to keep variables
    // and just process mixins
    var sgCssPlugins = [
        calc(),
        mixin()
    ];

    return gulp.src([
        paths.css.src + '/**/*.scss'
    ])
        .pipe($.postcss(sgCssPlugins, {syntax: scssSyntax}))
        .pipe(styleguide.generate({
            title: config.title  + ' Styleguide',
            server: true,
            port: $.util.env.port ? $.util.env.port + 99 : config.port + 1099,
            rootPath: paths.sg.dest,
            overviewPath: 'README.md'
        }))
        .pipe(gulp.dest(paths.sg.dest));
});


gulp.task('styleguide:styles', function() {
    return gulp.src(paths.css.dest + '/main.css')
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(paths.sg.dest));
});
