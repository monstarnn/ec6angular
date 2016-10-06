/** express server & lr & watch **/
var gulp = require('gulp');
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