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
    exec('JEKYLL_ENV=development jekyll build --watch', function(err, stdout, stderr) {
        console.log(stdout);
    });
});

gulp.task('build-production', function() {
    exec('JEKYLL_ENV=production jekyll build', function(err, stdout, stderr) {
        console.log(stdout);
    });
});

gulp.task('styles', function(){
	return gulp.src('./_src/homemade/styles/main.scss')
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('./resources/homemade/styles'))
	    .pipe(browserSync.stream());
});

gulp.task('scripts', function(){
	return gulp.src('./_src/homemade/scripts/*.js')
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
    gulp.watch('_src/homemade/styles/*.scss', ['styles']);
    gulp.watch('_src/homemade/scripts/*.js', ['scripts']);
    gulp.watch(['_site/index.html']).on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'scripts', 'build', 'serve']);

gulp.task('build-prod', ['styles', 'scripts', 'build-production']);