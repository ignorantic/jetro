
/*
 *     karma.conf.js for Jetro project
 *     April 2017 by Andrii Sorokin
 *     https://github.com/ignorantic/jetro.git
 */

module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'mocha', 'chai'],
        plugins: [
            'karma-spec-reporter',
            'karma-mocha',
            'karma-chai',
            'karma-browserify',
            'karma-phantomjs-launcher'
        ],
        files: [
            'dev/lib/**/*.{js, spec.js}'
        ],
        exclude: [
        ],
        preprocessors: {
            'dev/lib/**/*.{js, spec.js}': ['browserify']
        },
        browserify: {
            debug: true,
            transform: ['babelify']
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        concurrency: Infinity
    })
}