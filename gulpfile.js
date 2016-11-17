'use strict';

var gulp, sass, pug, concat, debug, imagemin, rigger, pngquant,
    sourcemap, del, path, sync, plumber;

gulp        = require('gulp');
sass        = require('gulp-sass');
pug         = require('gulp-pug');
concat      = require('gulp-concat');
debug       = require('gulp-debug');
imagemin    = require('gulp-imagemin');
rigger      = require('gulp-rigger');
pngquant    = require('imagemin-pngquant');
sourcemap   = require('gulp-sourcemaps');
del         = require('del');
sync        = require('browser-sync').create();
plumber     = require('gulp-plumber');

path = {
    build: {
        pug: 'build/',
        js: 'build/js',
        css: 'build/css',
        img: 'build/img/',
        fonts: 'build/font/'
    },
    src: {
        img: ['dev/img/**/*.png', 'dev/img/**/*.svg'],
        pug: ['dev/pug/*.pug', '!dev/pug/tmpl/**/*.*'],
        fonts: 'dev/fonts/**/*.*',
        mixin: 'dev/blocks/mixins.sass'
    },
    blocks: {
        pug: 'dev/blocks/**/*.pug',
        js: 'dev/blocks/*.js',
        sass: 'dev/blocks/**/*.sass',
        css: 'dev/blocks/**/*.css'
    },
    clean: './build',
    watch: {
        pug: ['dev/blocks/**/*.pug', 'dev/pug/**/*.pug'],
        js: ['dev/blocks/**/*.js', 'dev/lib/**/*.js'],
        sass: 'dev/blocks/**/*.*',
        img: 'dev/img/**/.png',
        serve: 'build/**/*.*'
    }
};

gulp.task('build:pug', function() {
    return gulp.src(path.src.pug)
        .pipe(plumber())
        .pipe(debug({title: 'src pug:'}))
        .pipe(pug({
            pretty: true
        })).on('error', console.log)
        .pipe(debug({title: 'render pug:'}))
        .pipe(gulp.dest(path.build.pug));
});

gulp.task('build:sass', function() {
    return gulp.src([path.blocks.sass, path.blocks.css])
        .pipe(plumber())
        .pipe(debug({title: 'src sass:'}))
        .pipe(sourcemap.init())
        .pipe(debug({title: 'sourcemap css init:'}))
        .pipe(sass())
        .pipe(debug({title: 'sass:'}))
        .pipe(concat('index.css'))
        .pipe(debug({title: 'concat sass:'}))
        .pipe(sourcemap.write())
        .pipe(debug({title: 'sourcemap css write:'}))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('build:js', function () {
    return gulp.src(path.blocks.js)
        .pipe(plumber())
        .pipe(debug({title: 'src js:'}))
        .pipe(rigger())
        .pipe(debug({title: 'rigger js:'}))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('build:fonts', function() {
    return gulp.src(path.src.fonts)
        .pipe(debug({title: 'src fonts:'}))
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build:img', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(debug({title: 'imagemin:'}))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('clean', function () {
    return del(path.clean);
});

gulp.task('build', gulp.series('clean', 'build:pug', 'build:fonts', 'build:sass', 'build:js', 'build:img'));
gulp.task('build:fast', gulp.series('build:pug', 'build:fonts', 'build:sass', 'build:js'));

gulp.task('serve', function () {
    sync.init({
        server: 'build'
    });

    sync.watch(path.watch.serve).on('change', sync.reload);
});

gulp.task('watch', function() {
    gulp.watch(path.watch.pug, gulp.series('build:pug'));
    gulp.watch(path.watch.img, gulp.series('build:img'));
    gulp.watch(path.watch.sass, gulp.series('build:sass'));
    gulp.watch(path.watch.js, gulp.series('build:js'));
});

gulp.task('default', gulp.series('build'));
gulp.task('run', gulp.series('build:fast', gulp.parallel('watch', 'serve')));