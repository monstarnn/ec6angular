var gulp = require('gulp');
var browserify = require("browserify");
var watchify = require('watchify');
var gIf = require('gulp-if');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require("babelify");
var assign = require('lodash.assign');

function bundle(option) {
	
	var opts = assign(
		{}, 
		watchify.args,
		{
			debug: option.debug,
			entries: option.entryPoint,
			ignoreWatch: ['**/node_modules/**', '**/bower_components/**', '**/bower_modules/**'],
			poll: true
		}
	);

	var bfy = browserify(opts);
	
	if (option.watch) {

		bfy = watchify(bfy);

		console.log(("Watching ES6 modules for " + option.entryPoint).yellow);
		bfy.on('update', function (ids) {
			gutil.log(('Watchify. Updated files ' + ids).yellow);
			return processBundle(bfy, option);
		}).on('time', function (time) {
			gutil.log(('Rebuilded time:' + time).green);
		});

	}
   
	return processBundle(bfy, option);

}

function processBundle(bfy, option) {

	return bfy
		.on('error', error)
		.transform(babelify, {
			presets: ['es2015']
		})
		.bundle()
		.pipe(source(option.bundleName))
		.pipe(buffer())
		.pipe(gIf(option.map, sourcemaps.init({loadMaps: true, addComment: false})))
		.pipe(gIf(option.minify, uglify(option.bundleNameMin, {
			outSourceMap: option.map
		})))
		.pipe(gIf(option.map, sourcemaps.write('./')))
		.pipe(gulp.dest(option.destPathName));

}

function error(a){
	gutil.log('Bundle ES6 error'.red, a.toString().red);
}

module.exports = bundle;
