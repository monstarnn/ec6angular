var gulp = require('gulp');
var runSequence = require('run-sequence');
var gwatch = require('gulp-watch');
// var bowerFiles = require('main-bower-files');
// var nib = require('nib');
var sourcemaps = require('gulp-sourcemaps');
// var stylus = require('gulp-stylus');
var sass = require('gulp-sass');
var templateCache = require('gulp-angular-templatecache');
var config = require('./configurationManager').get();
var del = require('del');
var assign = require('lodash.assign');
var util = require('gulp-util');
var configManager = require('./configurationManager');

/** Config variables **/
var path = require('path'),
    destPathName = config.destPathName,
    destDir = './' + destPathName,
    appDir = config.appDir
    // bowerDir = appDir + '/bower_components'
    ;

gulp.task('clean', del.bind(null, [destDir], {force: true}));

gulp.task('img', function () {
    return gulp.src([appDir + '/img/**/*.*'])
        .pipe(gulp.dest(destDir + '/img/'))
});
// gulp.task('stylus', function () {
//     return gulp.src([appDir + '/stylus/*.styl'])
//         .pipe(sourcemaps.init())
//         .pipe(stylus({use: nib()}))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(destDir + '/css'));
// });
// gulp.task('css', function () {
//     return gulp.src([appDir + '/css/*.css'])
//         .pipe(gulp.dest(destDir+ '/css'))
// });
gulp.task('html', function () {
    return gulp.src([appDir + '/*.html'])
        .pipe(gulp.dest(destDir))
});

gulp.task('templateCache', function () {
    return gulp.src(appDir + '/js/**/*.html')
        .pipe(templateCache('templates.js', {
            module: 'main.templates'
        }))
        .pipe(gulp.dest(destDir + '/js'));
});
gulp.task('bower_components', function () {
    return gulp.src([appDir + '/bower_components/**/*.*'])
        .pipe(gulp.dest(destDir + '/bower_components/'))
});
gulp.task('sass', function () {
    return gulp.src(appDir + '/css/_scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destDir + '/css'));
});

gulp.task('build-es6', function (cb) {
    runSequence(
        'build-es6-app'
        , 'build-es6-login'
        , cb
    );
});

var bundler = require('./es6bundler');

gulp.task('build-es6-app', function () {
    var options = assign({}, config);
    options.entryPoint = appDir + '/js/app.js';
    options.bundleName = 'app.js';
    options.bundleNameMin = 'app.min.js';
    options.destPathName = destPathName + '/js';
    return bundler(options);
});

gulp.task('build-es6-login', function () {
    var options = assign({}, config);
    options.entryPoint = appDir + '/js/login.js';
    options.bundleName = 'login.js';
    options.bundleNameMin = 'login.min.js';
    options.destPathName = destPathName + '/js';
    return bundler(options);
});

gulp.task('watch', ['injects'], function (cb) {

    if (config.watch) {

        var watchOptions = {readDelay: 500};
        var startTasks = function startTasks(type, tasks) {
            return function (e) {
                util.log((e.event + ' ' + type + ' file: ' + e.relative).yellow);
                this.start(tasks);
            }.bind(this);
        }.bind(this);

        console.log('Start watching angular templates');
        gwatch(appDir + '/js/**/*.html', watchOptions, startTasks('template', 'templateCache'));

        console.log('Start watching SCSS files');
        gwatch(appDir + '/**/*.scss', watchOptions, startTasks('SCSS', 'sass'));

        console.log('Start watching app HTML files');
        gwatch(appDir + '/*.html', watchOptions, startTasks('HTML', 'injects'));

        if (config.livereload) {
            var callNotifyLiveReload = underscore.debounce(function (event) {
                notifyLiveReload(event)
            }, 1000);
            gwatch([
                destPathName + '/**/*'
            ], callNotifyLiveReload);
        }
    }

    cb();
});

function notifyLiveReload(event) {
    console.log(('NotifyLiveReload').yellow);
    var fileName = path.relative(__dirname, event.path);
    tinylr.changed({
        body: {
            files: [fileName]
        }
    });
}

gulp.task('build', function (cb) {
    runSequence(
        'clean',
        [
            'img',
            // 'css',
            // 'html',
            'bower_components',
            'templateCache',
            'sass',
            'build-es6'
        ],
        'injects', cb);
});

gulp.task('build-watch', function (cb) {
    configManager.set({
        watch: true
    });
    runSequence(
        'build',
        'watch',
        cb);
});
