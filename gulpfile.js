'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
    files: 'dist/**/**',
    platforms: ['win64'],
    version: '0.25.2'
});

gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('src/assets/css'));
});

gulp.task('sw', ['sass'], function() {
    gulp.watch([
        'scss/**/*.scss'
    ], function() {
        gulp.run('sass');
    })
});

gulp.task('build', function() {
    nw.build().then(function () {
        console.log('all done!');
     }).catch(function (error) {
         console.error(error);
     });
});

gulp.task('sass:watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
});