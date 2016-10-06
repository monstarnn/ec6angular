/** express server & lr & watch **/
var gulp = require('gulp');
var gwatch = require('gulp-watch');
var path = require('path');
var runSequence = require('run-sequence');
var underscore = require('underscore');
var configManager = require('./configurationManager');
var config = configManager.get();

var appDir = config.appDir;
var destPathName = config.destPathName;
var util = require('gulp-util');

var tinylr;

var expressSrc = path.join(__dirname, '../dist'),
	port = config.servePort,
	urlPort = config.urlPort || port,
	lrPort = config.liveReloadPort;

gulp.task('express', function (cb) {
	var express = require('express');
	var app = express();
	console.log(('Start express in ' + expressSrc).green);
	if(config.livereload)
		app.use(require('connect-livereload')({port: lrPort}));
	app.use(express.static(expressSrc, {
		setHeaders: function (res, path, stat) {
			res.set('cache-control', "no-cache")
		}
	}));
	app.listen(port);
	cb();
});

gulp.task('livereload', function (cb) {
	tinylr = require('tiny-lr')();
	tinylr.listen(lrPort);
	cb();
});

gulp.task('open', function (cb) {
	var url = config.url +':'+ urlPort + '/';
	console.log(('Open ' + url).green);
	require('opn')(url);
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


/**
 * Run server
 */
gulp.task('serve', function (done) {
	configManager.set({
		watch: true
		// , livereload: true
	});
	var sequence = [];
	sequence.push('build');
	sequence.push('express');
	if(config.livereload) sequence.push('livereload');
	sequence.push('watch');
	sequence.push('open');
	sequence.push(done);
	runSequence.apply(this, sequence);
});

/**********************/