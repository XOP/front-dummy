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


//
// styles
gulp.task('styles', function() {

    var svg = require('postcss-svg');

    var preCssPlugins = [
        precss(),
        at2x(),
        svg(),
        autoprefixer({ browsers: Browsers })
    ];

    var postCssPlugins = [
        production ? nano() : null,
        calc()
    ].filter(function(item){
            return item !== null;
        });

    return merge(
        // normalize
        gulp.src(paths.deps.normalize + '/normalize.css'),

        // project styles
        gulp.src(paths.css.src + '/main.scss')
            .pipe($.plumber())
            .pipe($.postcss(preCssPlugins, {parser: scssSyntax})),

        // icons
        gulp.src(paths.sprites.src + '/css/*.css')
    )
        .pipe($.plumber())
        .pipe($.concatCss('main.css', {
            rebaseUrls: false
        }))
        .pipe(!production ? $.sourcemaps.init() : $.util.noop())
        .pipe($.postcss(postCssPlugins))
        .pipe(!production ? $.sourcemaps.write('.') : $.util.noop())
        .pipe(gulp.dest(paths.css.dest));
});
