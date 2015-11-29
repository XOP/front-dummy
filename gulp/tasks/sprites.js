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


var del = require('del');


//
// sprites
gulp.task('sprites', ['clean:sprites'], function() {

    // normal icons config
    var icons = {
        shape: {
            dimension: {
                maxWidth: 16,
                maxHeight: 16,
                precision: 0
            }
        },
        mode: {
            css: {
                dest: '.',
                sprite: 'img/sprite.css.svg',
                render: {
                    css: {
                        dest: 'css/sprite16.css'
                    }
                },
                hasCommon: true,
                common: 'icon',
                prefix: '.icon__',
                dimensions: true
            }
        }
    };

    // large icons config
    var iconsLarge = JSON.parse(JSON.stringify(icons));
    iconsLarge.shape.dimension.maxWidth = 24;
    iconsLarge.shape.dimension.maxHeight = 24;
    iconsLarge.mode.css.common = 'icon__l';
    iconsLarge.mode.css.prefix = '.icon__l__';
    iconsLarge.mode.css.render.css.dest = 'css/sprite24.css';

    return merge(
        gulp.src('**/*.svg', {cwd: paths.img.src + '/ico'})
            .pipe($.svgSprite(icons)),
        gulp.src('**/*.svg', {cwd: paths.img.src + '/ico'})
            .pipe($.svgSprite(iconsLarge))
    )
        .pipe(gulp.dest(paths.sprites.src));
});


//
// clean temp sprites folder
gulp.task('clean:sprites', function(cb){
    return del([
        paths.sprites.src
    ], cb);
});
