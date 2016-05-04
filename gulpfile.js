'use strict';

var gulp = require('gulp'),
	exec = require('child_process').exec,
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('build', function() {
    exec('jekyll build --watch', function(err, stdout, stderr) {
        console.log(stdout);
    });
});

gulp.task('styles', function(){
	return gulp.src('./resources/_homemade/styles/main.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('./resources/homemade/styles'))
	    .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
	return gulp.src('./resources/_homemade/scripts/*.js')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./resources/homemade/scripts'))
		.pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./resources/homemade/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({ server: { baseDir: '_site/' } });
    gulp.watch('resources/_homemade/styles/*.scss', ['styles']);
    gulp.watch('resources/_homemade/scripts/*.js', ['scripts']);
    gulp.watch(['_site/**/*.*']).on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'scripts', 'build', 'serve']);