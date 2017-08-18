'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('src/assets/scss/main.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('src/assets/css'));
});
gulp.task('default', ['sass'], function() {
    gulp.watch([
        'src/assets/scss/*.scss'
    ], function() {
        gulp.run('sass');
    })
});
gulp.task('sass:watch', function () {
  gulp.watch('src/assets/scss/*.scss', ['sass']);
});