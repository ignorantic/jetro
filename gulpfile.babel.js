/**
 *     gulpfile.babel.js for Jetro project
 *     Created by Andrii Sorokin on 10/9/16
 *     https://github.com/ignorantic/jetro.git
 */

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';
import source from 'vinyl-source-stream';
import pngquant from 'imagemin-pngquant';
import browserify from 'browserify';
import {Server as Karma} from 'karma';

const $ = gulpLoadPlugins();
const reload = $.connect.reload;

const ISDEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

const PATHS = {
    build: {
        pug:    'build/',
        js:     'build/js/',
        css:    'build/css/',
        img:    'build/img/',
        fonts:  'build/fonts/'
    },
    src:    {
      img:    [
                'dev/img/**/*.{png,jpg,gif,svg}',
                '!dev/img/sprite/**/*.*'
              ],
      pug:      'dev/pages/*.pug',
      sass:     'dev/index/site.sass',
      js:       'dev/index/app.js',
      fonts:    'dev/fonts/**/*.*'
    },
    sprite: {
      src:      'dev/img/sprite/*.png',
      imgName:  '../img/sprite.png',
      cssName:  '_sprite.sass',
      img:      'dev/img/',
      css:      'dev/mixins/'
    },
    clean:      './build',
    lint:   {
      pug:      'dev/{blocks,components,pages}/**/*.pug',
      js:       'dev/{index,blocks,components,test}/**/*.js',
      sass:   [
                'dev/{index,blocks,components,mixins}/**/*.{sass,css}',
                '!dev/mixins/_sprite.sass',
                '!dev/mixins/_reset.sass',
              ]
    },
    watch:  {
      pug:      'dev/{blocks,components,pages}/**/*.pug',
      js:       'dev/{index,blocks,components,test}/**/*.js',
      sass:     'dev/{index,blocks,components,fonts,mixins}/**/*.{sass,css}',
      img:      'dev/img/**/*.{png,jpg,gif,svg}',
      fonts:    'dev/fonts/**/*.{ttf,eot,svg,woff,woff2}'
    }
};

/**
 *     PUG
 */

gulp.task('build:pages', function (done) {
  gulp.src(PATHS.src.pug)
    .pipe($.pug({
      pretty: true
    }))
    .on('error', function (err) {
      $.util.log($.util.colors.red('💀'), $.util.colors.red.bold('⇵ pug inputError'));
      $.util.log($.util.colors.yellow(err.message));
      this.emit('end');
    })
    .pipe(gulp.dest(PATHS.build.pug))
    .pipe(reload());
  done();
});

/**
 *      PUG LINT
 */

gulp.task('lint:pug', function (done) {
  gulp
    .src(PATHS.lint.pug)
    .pipe($.pugLint());
  done();
});

/**
 *      SASS
 */

gulp.task('build:sass', function(done) {
    gulp.src(PATHS.src.sass)
        .pipe($.if(ISDEV, $.sourcemaps.init()))
        .pipe($.sass())
        .on('error', function(err){
          $.util.log($.util.colors.red('💀'), $.util.colors.red.bold('⇵ sass inputError'));
          $.util.log($.util.colors.yellow(err.message));
          this.emit('end');
        })
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe($.if(ISDEV, $.sourcemaps.write(), $.cssmin()))
        .pipe(gulp.dest(PATHS.build.css))
        .pipe(reload());
    done();
});

/**
 *      SASS LINT
 */

gulp.task('lint:sass', function (done) {
  gulp.src(PATHS.lint.sass)
    .pipe($.sassLint({
            options: {
                configFile: '.sass-lint.yml'
            }
        }))
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError());
  done();
});

/**
 *      BROWSERIFY
 */

gulp.task('build:js', function (done) {
  browserify({
      entries: PATHS.src.js,
      extensions: ['.js'],
      debug: true
    })
    .transform('babelify')
    .bundle()
    .on('error', function (err) {
      $.util.log($.util.colors.red('💀'), $.util.colors.red.bold('⇵ browserify inputError'));
      $.util.log($.util.colors.yellow(err.message));
      this.emit('end');
    })
    .pipe(source(path.basename(PATHS.src.js)))
    .pipe($.if(!ISDEV, $.streamify($.uglify())))
    .pipe(gulp.dest(PATHS.build.js))
    .pipe(reload());
  done();
});

/**
 *      JS LINT
 */

gulp.task('lint:js', function (done) {
  gulp.src(PATHS.lint.js)
    .pipe($.eslint())
    .pipe($.eslint.format());
  done();
});

/**
 *      TEST-DRIVE DEVELOPMENT
 */

gulp.task('tdd', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    autoWatch: true,
    singleRun: false
  }, function () {
    done();
  }).start();
});

/**
 *      FONTS
 */

gulp.task('build:fonts', function (done) {
  gulp.src(PATHS.src.fonts)
    .pipe(gulp.dest(PATHS.build.fonts))
    .pipe(reload());
  done();
});

/**
 *      IMAGES
 */

gulp.task('build:img', function (done) {
  gulp.src(PATHS.src.img)
    .pipe($.cached('build:img'))
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe($.debug({
      title: 'imagemin'
    }))
    .pipe(gulp.dest(PATHS.build.img))
    .pipe(reload());
  done();
});

/**
 *      SPRITE
 */

gulp.task('build:sprite', function (done) {
  const spriteData = gulp.src(PATHS.sprite.src).pipe($.spritesmith({
    imgName: PATHS.sprite.imgName,
    cssName: PATHS.sprite.cssName,
    algorithm: 'left-right'
  }));
  spriteData.img.pipe(gulp.dest(PATHS.sprite.img));
  spriteData.css.pipe(gulp.dest(PATHS.sprite.css));
  done();
});

/**
 *      CLEAN
 */

gulp.task('clean', function (done) {
  del(PATHS.clean);
  done();
});

/**
 *      SERVER
 */

gulp.task('server', function (done) {
  $.connect.server({
    name: '🌍 ⇵ Jetro',
    port: 3000,
    root: 'build',
    livereload: true
  });
  done();
});

/**
 *      WATCH
 */

gulp.task('watch', function (done) {
  gulp.watch(PATHS.watch.pug, gulp.series('build:pages'));
  gulp.watch(PATHS.watch.img, gulp.series('build:img'));
  gulp.watch(PATHS.watch.sass, gulp.series('lint:sass', 'build:sass'));
  gulp.watch(PATHS.watch.fonts, gulp.series('build:fonts'));
  gulp.watch(PATHS.watch.js, gulp.series('lint:js', 'build:js'));
  done();
});

/**
 *      COMPLEX TASKS
 */

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'build:img',
    'build:sprite',
    'build:fonts',
    'build:pages',
    'build:sass',
    'build:js'))
);

gulp.task('default', gulp.series('build'));

gulp.task('linting', function (done) {
  gulp.watch(PATHS.watch.js, gulp.series('lint:js'));
  done();
});

gulp.task('run', gulp.series(
  gulp.parallel(
    'build:pages',
    'lint:sass',
    'build:sass',
    'lint:js',
    'build:js'
  ),
  gulp.parallel(
    'watch',
    'server'
  ))
);
