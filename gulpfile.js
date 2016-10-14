'use strict';

var gulp, sass, uglify, concat, debug, imagemin, pngquant, sourcemap, del, path, sync;

gulp = require('gulp');
sass = require('gulp-sass');
uglify = require('gulp-uglify');
concat = require('gulp-concat');
debug = require('gulp-debug');
imagemin = require('gulp-imagemin');
pngquant = require('imagemin-pngquant');
sourcemap = require('gulp-sourcemaps');
del = require('del');
sync = require("browser-sync").create();

path = {
    build: {
        html: 'build/',
        js: 'build/js',
        css: 'build/css',
        img: 'build/img/',
        fonts: 'build/font/'
    },
    src: {
        img: 'dev/img/*.png',
        html: 'dev/html/*.html',
        fonts: 'dev/fonts/**/*.*',
        font_css: 'dev/fonts-styles/**/*.*'
    },
    blocks: {
        js: 'dev/blocks/**/*.js',
        sass: 'dev/blocks/**/*.sass'
    },
    clean: './build'
};

gulp.task('build:html', function() {
    return gulp.src([path.src.html], {since: gulp.lastRun('build:html')})
        .pipe(debug({title: 'src:'}))
        .pipe(gulp.dest(path.build.html));
});

gulp.task('build:sass', function() {
    return gulp.src([path.blocks.sass, path.src.font_css])
        .pipe(debug({title: 'src sass:'}))
        .pipe(sourcemap.init())
        .pipe(debug({title: 'sourcemap init:'}))
        .pipe(sass())
        .pipe(debug({title: 'sass:'}))
        .pipe(sourcemap.write())
        .pipe(debug({title: 'sourcemap write:'}))
        .pipe(concat('index.css'))
        .pipe(debug({title: 'concat sass:'}))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('build:js', function () {
    return gulp.src(path.blocks.js)
        .pipe(debug({title: 'src js:'}))
        .pipe(sourcemap.init())
        .pipe(debug({title: 'sourcemap init:'}))
        .pipe(concat('index.js'))
        .pipe(debug({title: 'concat js:'}))
        .pipe(uglify())
        .pipe(debug({title: 'uglify js:'}))
        .pipe(sourcemap.write())
        .pipe(debug({title: 'sourcemap write:'}))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('build:fonts', function() {
    return gulp.src([path.src.fonts], {since: gulp.lastRun('build:fonts')})
        .pipe(debug({title: 'src:'}))
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

gulp.task('serve', function () {
    sync.init({
        server: 'build'
    });

    sync.watch('build/**/*.*').on('change', sync.reload);
});

gulp.task('watch', function() {
    gulp.watch(path.src.html, gulp.series('build:html'));
    gulp.watch(path.src.img, gulp.series('build:img'));
    gulp.watch([path.blocks.sass, path.src.font_css], gulp.series('build:sass'));
    gulp.watch(path.blocks.js, gulp.series('build:js'));
});

gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));