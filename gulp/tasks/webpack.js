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


// webpack
var webpack = require('webpack');


//
// webpack for scripts
gulp.task('webpack', function(cb) {
    var config = require(__base + 'webpack.config.js');

    if (production) {
        config.plugins =
            [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                })
            ]
    }

    webpack(config,
        function(err, stats) {
            if (err) {
                throw new $.util.PluginError('webpack', err);
            }
            $.util.log('[webpack]', stats.toString());
            cb();
        });
});
