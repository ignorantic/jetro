var gulp, sass, pug, concat, imagemin, pngquant, sourcemap, rename, uglify,
    del, path, connect, babel, browserify, babelify, gutil, source, cssmin, pump;

gulp        = require('gulp');
sass        = require('gulp-sass');
pug         = require('gulp-pug');
concat      = require('gulp-concat');
imagemin    = require('gulp-imagemin');
pngquant    = require('imagemin-pngquant');
sourcemap   = require('gulp-sourcemaps');
del         = require('del');
connect     = require('gulp-connect');
babel       = require('gulp-babel');
browserify  = require('browserify');
babelify    = require('babelify');
gutil       = require('gulp-util');
source      = require('vinyl-source-stream');
cssmin      = require('gulp-cssmin');
uglify      = require('gulp-uglify');
pump        = require('pump');
rename      = require('gulp-rename');

path = {
    build: {
        pug:    'build/',
        js:     'build/js/',
        css:    'build/css/',
        img:    'build/img/',
        fonts:  'build/fonts/'
    },
    src:    {
        img:    'dev/img/**/*.{png,jpg,svg}',
        pug:    ['dev/pages/*.pug', '!dev/pages/tmpl/**/*.*'],
        sass:   'dev/blocks/**/*.sass',
        fonts:  'dev/fonts/**/*.*',
        mixin:  'dev/blocks/mixins.sass'
    },
    clean:      './build',
    watch:  {
        pug:    ['dev/blocks/**/*.pug', 'dev/pages/**/*.pug'],
        js:     ['dev/blocks/**/*.js', 'dev/lib/**/*.js'],
        sass:   'dev/blocks/**/*.*',
        img:    'dev/img/**/*.png',
        fonts:  'dev/fonts/**/*.*',
        serve:  'build/**/*.*'
    }
};

/*
 *     PUG
 */

gulp.task('build:pages', function() {
    return gulp.src(path.src.pug)
        .pipe(pug({
            pretty: true
        }))
        .on('error', function(err){
            gutil.log(gutil.colors.red('💀'), gutil.colors.red.bold('⇵ pages error'));
            gutil.log(gutil.colors.yellow(err.message));
            this.emit('end');
        })
        .pipe(gulp.dest(path.build.pug))
        .pipe(connect.reload());
});

/*
 *      SASS
 */

gulp.task('build:sass', function() {
    return gulp.src(path.src.sass)
        .pipe(sourcemap.init())
        .pipe(sass())
        .on('error', function(err){
            gutil.log(gutil.colors.red('💀'), gutil.colors.red.bold('⇵ sass error'));
            gutil.log(gutil.colors.yellow(err.message));
            this.emit('end');
        })
        .pipe(concat('index.css'))
        .pipe(sourcemap.write())
        // .pipe(cssmin())
        .pipe(gulp.dest(path.build.css))
        .pipe(connect.reload());
});

/*
 *      BROWSERIFY
 */

gulp.task('bundle:js', function () {
    return browserify({
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
        .pipe(gulp.dest(path.build.js))
        .pipe(connect.reload());
});

/*
 *      UGLIFY
 */

gulp.task('uglify:js', function (cb) {
    pump([
            gulp.src(path.build.js + '*'),
            uglify(),
            gulp.dest(path.build.js)
        ],
        cb
    );
});

/*
 *      FONTS
 */

gulp.task('build:fonts', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(connect.reload());
});

/*
 *      IMAGES
 */

gulp.task('build:img', function () {
    return gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(connect.reload());
});

/*
 *      CLEAN
 */

gulp.task('clean', function () {
    return del(path.clean);
});

/*
 *      SERVER
 */

gulp.task('server', function() {
    connect.server({
        name: '🌍 ⇵ Caramel',
        port: 3000,
        root: 'build',
        livereload: true
    });;
});

/*
 *      WATCH
 */

gulp.task('watch', function() {
    gulp.watch(path.watch.pug, gulp.series('build:pages'));
    gulp.watch(path.watch.img, gulp.series('build:img'));
    gulp.watch(path.watch.sass, gulp.series('build:sass'));
    gulp.watch(path.watch.fonts, gulp.series('build:fonts'));
    gulp.watch(path.watch.js, gulp.series('build:js'));
});

/*
 *      COMPLEX TASKS
 */

gulp.task('build:js', gulp.series('bundle:js', 'uglify:js'));
gulp.task('build', gulp.series('clean', 'build:pages', 'build:fonts', 'build:sass', 'build:js', 'build:img'));
gulp.task('build:fast', gulp.series('build:pages', 'build:fonts', 'build:sass', 'build:js'));

gulp.task('default', gulp.series('build'));
gulp.task('run', gulp.series('build:fast', gulp.parallel('watch', 'server')));