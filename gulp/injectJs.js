/**
 * Created by rsabiryanov on 18.03.2015.
 */
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

	var bundle = [destPathName + '/js/bundle.js'];
	bundle.injectPlaceholder = 'bundle';
	var login = [destPathName + '/js/login.js'];
	login.injectPlaceholder = 'login';

	return gulp.src(destPathName + '/*.html')
		.pipe(inject(gulp.src(mainTemplates), {
				read: false,
				ignorePath: 'dist',
				name: mainTemplates.injectPlaceholder
			}
		))
		.pipe(inject(gulp.src(bundle), {
				read: false,
				ignorePath: 'dist',
				name: bundle.injectPlaceholder
			}
		))
		.pipe(inject(gulp.src(login), {
				read: false,
				ignorePath: 'dist',
				name: login.injectPlaceholder
			}
		))
		.pipe(gulp.dest(destPathName));

});
