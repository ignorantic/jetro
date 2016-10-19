'use strict';

var gulp, sass, uglify, concat, debug, imagemin, rigger, pngquant, sourcemap, del, path, sync;

gulp = require('gulp');
sass = require('gulp-sass');
uglify = require('gulp-uglify');
concat = require('gulp-concat');
debug = require('gulp-debug');
imagemin = require('gulp-imagemin');
rigger = require('gulp-rigger');
pngquant = require('imagemin-pngquant');
sourcemap = require('gulp-sourcemaps');
del = require('del');
sync = require('browser-sync').create();

path = {
    build: {
        html: 'build/',
        js: 'build/js',
        css: 'build/css',
        img: 'build/img/',
        fonts: 'build/font/'
    },
    src: {
        img: 'dev/img/**/*.png',
        html: 'dev/html/*.html',
        fonts: 'dev/fonts/**/*.*',
        mixin: 'dev/blocks/mixins.sass'
    },
    blocks: {
        tmpl: 'dev/blocks/**/*.html',
        js: 'dev/blocks/*.js',
        sass: 'dev/blocks/**/*.sass',
        css: 'dev/blocks/**/*.css'
    },
    clean: './build',
    watch: {
        html: 'dev/html/**/*.html',
        tmpl: 'dev/blocks/**/*.html',
        js: 'dev/blocks/**/*.js',
        sass: 'dev/blocks/**/*.*',
        img: 'dev/img/**/.png',
        lib: 'dev/lib/**/*.js'
    }
};

gulp.task('build:html', function() {
    return gulp.src([path.src.html, path.blocks.tmpl])
        .pipe(debug({title: 'src html:'}))
        .pipe(rigger())
        .pipe(debug({title: 'rigger html:'}))
        .pipe(gulp.dest(path.build.html));
});

gulp.task('build:sass', function() {
    return gulp.src([path.blocks.sass, path.blocks.css])
        .pipe(debug({title: 'src sass:'}))
        .pipe(sourcemap.init())
        .pipe(debug({title: 'sourcemap init:'}))
        .pipe(sass().on('error', sass.logError))
        .pipe(debug({title: 'sass:'}))
        .pipe(concat('index.css'))
        .pipe(debug({title: 'concat sass:'}))
        .pipe(sourcemap.write())
        .pipe(debug({title: 'sourcemap write:'}))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('build:js', function () {
    return gulp.src(path.blocks.js)
        .pipe(debug({title: 'src js:'}))
        .pipe(rigger())
        .pipe(debug({title: 'rigger js:'}))
        // .pipe(uglify())
        // .pipe(debug({title: 'uglify js:'}))
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

gulp.task('build', gulp.series('clean', 'build:html', 'build:fonts', 'build:sass', 'build:js', 'build:img'));
gulp.task('build:fast', gulp.series('build:html', 'build:fonts', 'build:sass', 'build:js'));

gulp.task('serve', function () {
    sync.init({
        server: 'build'
    });

    sync.watch('build/**/*.*').on('change', sync.reload);
});

gulp.task('watch', function() {
    gulp.watch(path.watch.html, gulp.series('build:html'));
    gulp.watch(path.watch.tmpl, gulp.series('build:html'));
    gulp.watch(path.watch.img, gulp.series('build:img'));
    gulp.watch(path.watch.sass, gulp.series('build:sass'));
    gulp.watch(path.watch.js, gulp.series('build:js'));
    gulp.watch(path.watch.lib, gulp.series('build:js'));
});

gulp.task('default', gulp.series('build'));
gulp.task('run', gulp.series('build:fast', gulp.parallel('watch', 'serve')));
