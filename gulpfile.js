'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var exec = require('child_process').exec;

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
    console.log('Installing packages...');
    exec('npm install', { cwd: 'dist', stdio: 'inherit' }, function (error, stdout, stderr) {
        if (stderr !== null) {
            console.log(stderr);
        }
        if (stdout !== null) {
            console.log(stdout);
        }
        if (error !== null) {
            console.log(error);
        }
    }).on('close', done);

    function done() {
        exec('npm run package', { cwd: 'dist', stdio: 'inherit' }, function (error, stdout, stderr) {
            if (stderr !== null) {
                console.log(stderr);
            }
            if (stdout !== null) {
                console.log(stdout);
            }
            if (error !== null) {
                console.log(error);
            }
        });
    }
});

gulp.task('sass:watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
});