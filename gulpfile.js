/*------------------------------------------------------------------------------
	Dependencies
------------------------------------------------------------------------------*/
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	connect = require('gulp-connect'),
	rename = require("gulp-rename"),
	del = require('del'),
	uglify = require('gulp-uglify');


/*------------------------------------------------------------------------------
	Webserver
------------------------------------------------------------------------------*/
gulp.task('connect', function() {
	connect.server({
		root: '',
		livereload: true
	});
});


/*------------------------------------------------------------------------------
	Development tasks
------------------------------------------------------------------------------*/
gulp.task('concat', function () {
	gulp.src(['./js/app/init.js', './js/app/!(app)*.js', './js/app/app.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./js'))
		.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch('./js/app/*.js', ['concat']);
});


/*------------------------------------------------------------------------------
	Production tasks
------------------------------------------------------------------------------*/
gulp.task('concat-prod', function () {
	gulp.src(['./js/app/init.js', './js/app/!(app)*.js', './js/app/app.js'])
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js'));
});


/*------------------------------------------------------------------------------
	Gulp tasks
------------------------------------------------------------------------------*/
gulp.task('default', ['concat', 'watch', 'connect']);

gulp.task('build', ['concat-prod']);