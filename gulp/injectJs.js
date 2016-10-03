'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var config = require('./configurationManager').get();
var destPathName = config.destPathName;
var gIf = require('gulp-if');


/**
 * Определение порядка загрузки js файлов
 */

gulp.task('injectJs', function () {

	var mainTemplates = [destPathName + '/js/templates.js'];
	mainTemplates.injectPlaceholder = 'templates';

	var appJs = [destPathName + '/js/app.js'];
	appJs.injectPlaceholder = 'app';
	var loginJs = [destPathName + '/js/login.js'];
	loginJs.injectPlaceholder = 'login';

	return gulp.src(destPathName + '/*.html')
		.pipe(inject(gulp.src(mainTemplates), {
				read: false,
				ignorePath: 'dist',
				name: mainTemplates.injectPlaceholder
			}
		))
		.pipe(inject(gulp.src(appJs), {
				read: false,
				ignorePath: 'dist',
				name: appJs.injectPlaceholder
			}
		))
		.pipe(inject(gulp.src(loginJs), {
				read: false,
				ignorePath: 'dist',
				name: loginJs.injectPlaceholder
			}
		))
		.pipe(gulp.dest(destPathName));

});
