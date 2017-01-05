const gulp          = require('gulp');
const sourcemap     = require('gulp-sourcemaps');
const gutil         = require('gulp-util');
const connect       = require('gulp-connect');
const debug         = require('gulp-debug');
const pug           = require('gulp-pug');
const sass          = require('gulp-sass');
const prefixer      = require('gulp-autoprefixer');
const cssmin        = require('gulp-cssmin');
const rename        = require('gulp-rename');
const concat        = require('gulp-concat');
const imagemin      = require('gulp-imagemin');
const babel         = require('gulp-babel');
const streamify     = require('gulp-streamify');
const uglify        = require('gulp-uglify');
const cached        = require('gulp-cached');
const gulpif        = require('gulp-if');
const spritesmith   = require('gulp.spritesmith');
const babelify      = require('babelify');
const browserify    = require('browserify');
const del           = require('del');
const pngquant      = require('imagemin-pngquant');
const source        = require('vinyl-source-stream');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

path = {
    build: {
        pug:    'build/',
        js:     'build/js/',
        css:    'build/css/',
        img:    'build/img/',
        fonts:  'build/fonts/'
    },
    src:    {
        img:    ['dev/img/**/*.{png,jpg,svg}', '!dev/img/sprite/**/*.*'],
        pug:    ['dev/pages/*.pug', '!dev/pages/tmpl/**/*.*'],
        sass:   'dev/blocks/**/*.{sass,css}',
        fonts:  'dev/fonts/**/*.*'
    },
    clean:      './build',
    watch:  {
        pug:    ['dev/blocks/**/*.pug', 'dev/pages/**/*.pug'],
        js:     ['dev/blocks/**/*.js', 'dev/lib/**/*.js'],
        sass:   'dev/blocks/**/*.{sass,css}',
        img:    'dev/img/**/*.png',
        fonts:  'dev/fonts/**/*.{ttf,eot,svg,woff,woff2}',
        serve:  'build/**/*.*'
    }
};

/*
 *     PUG
 */

gulp.task('build:pages', function(done) {
    gulp.src(path.src.pug)
        .pipe(pug({
            pretty: true
        }))
        .on('error', function(err){
            gutil.log(gutil.colors.red('💀'), gutil.colors.red.bold('⇵ pug error'));
            gutil.log(gutil.colors.yellow(err.message));
            this.emit('end');
        })
        .pipe(gulp.dest(path.build.pug))
        .pipe(connect.reload());
    done();
});

/*
 *      SASS
 */

gulp.task('build:sass', function(done) {
    gulp.src(path.src.sass)
        .pipe(gulpif(isDev,  sourcemap.init()))
        .pipe(sass())
        .on('error', function(err){
            gutil.log(gutil.colors.red('💀'), gutil.colors.red.bold('⇵ sass error'));
            gutil.log(gutil.colors.yellow(err.message));
            this.emit('end');
        })
        .pipe(prefixer())
        .pipe(concat('index.css'))
        .pipe(gulpif(isDev, sourcemap.write(), cssmin()))
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
    done();
});

/*
 *      BROWSERIFY
 */

gulp.task('build:js', function (done) {
    browserify({
            entries: 'dev/blocks/index.js',
            extensions: ['.js'],
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015'],
            plugins: ['transform-class-properties']
        })
        .bundle()
        .on('error', function(err){
            gutil.log(gutil.colors.red('💀'), gutil.colors.red.bold('⇵ browserify error'));
            gutil.log(gutil.colors.yellow(err.message));
            this.emit('end');
        })
        .pipe(source('index.js'))
        .pipe(gulpif(!isDev, streamify(uglify())))
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
    done();
});

/*
 *      FONTS
 */

gulp.task('build:fonts', function(done) {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(connect.reload());
    done();
});

/*
 *      IMAGES
 */

gulp.task('build:img', function (done) {
    gulp.src(path.src.img)
        .pipe(cached('build:img'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(debug({title: 'imagemin'}))
        .pipe(gulp.dest(path.build.img))
        .pipe(connect.reload());
    done();
});

/*
 *      SPRITE
 */

gulp.task('build:sprite', function (done) {
    const spriteData = gulp.src('dev/img/sprite/*.png').pipe(spritesmith({
        imgName:    '../img/sprite.png',
        cssName:    'sprite.sass',
        algorithm:  'left-right'
    }));
    spriteData.img.pipe(gulp.dest('dev/img/'));
    spriteData.css.pipe(gulp.dest('dev/blocks/'));
    done();
});

/*
 *      CLEAN
 */

gulp.task('clean', function (done) {
    del(path.clean);
    done();
});

/*
 *      SERVER
 */

gulp.task('server', function(done) {
    connect.server({
        name: '🌍 ⇵ Caramel',
        port: 3000,
        root: 'build',
        livereload: true
    });
    done();
});

/*
 *      WATCH
 */

gulp.task('watch', function(done) {
    gulp.watch(path.watch.pug, gulp.series('build:pages'));
    gulp.watch(path.watch.img, gulp.series('build:img'));
    gulp.watch(path.watch.sass, gulp.series('build:sass'));
    gulp.watch(path.watch.fonts, gulp.series('build:fonts'));
    gulp.watch(path.watch.js, gulp.series('build:js'));
    done();
});

/*
 *      COMPLEX TASKS
 */

gulp.task('build', gulp.series('clean', 'build:pages', 'build:sprite', 'build:sass', 'build:js', 'build:img', 'build:fonts'));
gulp.task('default', gulp.series('build'));
gulp.task('run', gulp.series(gulp.parallel('build:pages', 'build:sass', 'build:js'), gulp.parallel('watch', 'server')));